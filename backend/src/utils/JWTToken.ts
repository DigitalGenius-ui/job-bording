import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../constants/env";
import { Types } from "mongoose";

export type accessType = {
  userId: Types.ObjectId;
  sessionId: Types.ObjectId;
};

type refreshType = {
  sessionId: Types.ObjectId;
};

type Params = {
  payload: accessType | refreshType;
  type: "refreshToken" | "accessToken";
};

const options = {
  // this is for knowing the user's roll
  audience: "user",
};

// generate new token
export const generateToken = ({ payload, type }: Params) => {
  const refreshToken = type === "refreshToken";
  const secret = refreshToken ? JWT_REFRESH_SECRET : JWT_ACCESS_SECRET;

  return jwt.sign(payload, secret, {
    ...options,
    expiresIn: refreshToken ? "30d" : "15d",
  });
};

// verify token
type verifiTokenType = "accessToken" | "refreshToken";

export const verifyToken = <
  T extends accessType & { error: string | undefined },
>(
  token: string,
  type: verifiTokenType
) => {
  const secret =
    type === "accessToken" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
  try {
    const payload = jwt.verify(token, secret, {
      ...options,
    }) as T;
    return { payload };
  } catch (error: any) {
    return {
      error: error.message || "Token verification failed",
    };
  }
};
