import { NOT_FOUND } from "../constants/http";
import appAssert from "../utils/AppAssert";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/JWTToken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  appAssert(accessToken, NOT_FOUND, "Access token is not provided!");

  const { payload, error } = verifyToken(accessToken, "accessToken");

  if (error) {
    console.log(error);
  }

  req.userId = payload?.userId;
  req.sessionId = payload?.sessionId;

  next();
};
