import { z } from "zod";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/http";
import VerificationCodeType from "../constants/VerificationCode";
import appAssert from "../utils/AppAssert";
import { checkPasswords, encryptPassword } from "../utils/BcryptJS";
import {
  fiveMinutesAgo,
  ON_DAY_MS,
  oneHoureFromNow,
  oneYearFromNow,
  thirtyDaysFromNow,
} from "../utils/Date";
import { generateToken, verifyToken } from "../utils/JWTToken";
import { sendEmail } from "../utils/sendEmail";
import { FRONTEND_URL } from "../constants/env";
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "../utils/emailTemplate";
import { SessionCodeModel, VerificationCodeModel } from "../models/auth-models";
import {
  loginValidSchemas,
  registerValidSchemas,
  resetPasswordValidSchemas,
  verificationCodeSchema,
} from "../schemas/auth-schema";
import { ProfileModel, UserModel } from "../models/users-models";

type regRequestType = z.infer<typeof registerValidSchemas>;

export const createAccount = async (request: regRequestType) => {
  const userExist = await UserModel.findOne({ email: request.email });

  appAssert(!userExist, CONFLICT, "Email is already in use!");

  // create new user
  const { password, confirmPassword, ...rest } = request;
  const newPassword = await encryptPassword(password);

  const profile = await ProfileModel.create({});
  const user = await UserModel.create({
    password: newPassword,
    ...rest,
    profile: profile._id,
  });

  const { password: createdPassword, ...userData } = user;

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verfity email
  const url = `${FRONTEND_URL}/email/verify/${verificationCode.id}`;
  const { error } = await sendEmail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });

  if (error) {
    console.log(error);
  }

  // create session
  const session = await SessionCodeModel.create({
    userId: user._id,
    userAgent: request.userAgent,
    expiresAt: thirtyDaysFromNow(),
  });

  // create refresh token
  const refreshToken = generateToken({
    payload: { sessionId: session._id },
    type: "refreshToken",
  });

  // create access token
  const accessToken = generateToken({
    payload: { userId: user._id, sessionId: session._id },
    type: "accessToken",
  });

  return {
    accessToken,
    refreshToken,
    user: userData,
  };
};

type logRequestType = z.infer<typeof loginValidSchemas>;

export const loginUser = async (request: logRequestType) => {
  // get user by email
  const userExists = await UserModel.findOne({ email: request.email });
  // valid user is exist
  appAssert(userExists, NOT_FOUND, "User is not exists!");

  const { _id: userId, password } = userExists;

  // valid password of the user
  const isPasswordValid = await checkPasswords(request.password, password);
  appAssert(isPasswordValid, CONFLICT, "Invalid email or password!");

  // create session
  const session = await SessionCodeModel.create({
    userId: userId,
    userAgent: request.userAgent,
    expiresAt: thirtyDaysFromNow(),
  });

  // create refresh token
  const refreshToken = generateToken({
    payload: { sessionId: session._id },
    type: "refreshToken",
  });

  // create access token
  const accessToken = generateToken({
    payload: {
      userId: userExists._id,
      sessionId: session._id,
    },
    type: "accessToken",
  });

  // return user and tokens
  const { password: createdPassword, ...userData } = userExists;
  return {
    accessToken,
    refreshToken,
    user: userData,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload, error } = verifyToken(refreshToken, "refreshToken");
  appAssert(!error, UNAUTHORIZED, "Invalid refreshToken!");

  const session = await SessionCodeModel.findOne({
    where: { id: payload?.sessionId },
  });

  const sessionExpireAt = session?.expiresAt;
  const now = Date.now();

  appAssert(
    sessionExpireAt && sessionExpireAt.getTime() > now,
    UNAUTHORIZED,
    "Session is expired!"
  );

  // refresh the session if it expires in 24 hours
  const isSessionExpiringSoon = sessionExpireAt.getTime() - now <= ON_DAY_MS();
  if (isSessionExpiringSoon) {
    const updateSession = await session.updateOne({
      expiresAt: thirtyDaysFromNow(),
    });
    await session.save();

    appAssert(updateSession, CONFLICT, "Failed to update session!");
  }

  // regenrate refresh and accesstokens
  const newRefreshToken = isSessionExpiringSoon
    ? generateToken({
        payload: { sessionId: session._id },
        type: "refreshToken",
      })
    : undefined;

  const accessToken = generateToken({
    payload: {
      userId: session.userId,
      sessionId: session._id,
    },
    type: "accessToken",
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

export const verifyUserEmail = async (
  verificationCode: z.infer<typeof verificationCodeSchema>
) => {
  // get verification code
  const getCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
  });
  appAssert(getCode, UNAUTHORIZED, "Verification code is not valid!");

  // get user by id
  const user = await UserModel.findOne({ _id: getCode.userId });
  appAssert(user, UNAUTHORIZED, "User is not exists!");

  // updater user verified to true
  const updateUser = await user.updateOne({ verified: true });
  await user.save();
  appAssert(updateUser, INTERNAL_SERVER_ERROR, "Failed to verify user!");

  // delete verification code
  await VerificationCodeModel.findByIdAndDelete({ id: verificationCode });

  // return user data
  const { password, ...userData } = user;
  return { user: userData };
};

export const forgotPassword = async (email: string) => {
  const user = await UserModel.findOne({ email });
  appAssert(user, NOT_FOUND, "User is not exists!");

  // check email rate limit
  const requestCount = await VerificationCodeModel.countDocuments({
    where: {
      userId: user._id,
      type: VerificationCodeType.PasswordReset,
      createdAt: {
        $gt: fiveMinutesAgo(),
      },
    },
  });

  appAssert(
    requestCount >= 1,
    TOO_MANY_REQUESTS,
    "Too many requests! Please try again later."
  );

  // create verification code for password reset
  const expiresAt = oneHoureFromNow();
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    expiresAt,
  });

  // send email with verification code
  const url = `${FRONTEND_URL}/password/reset?code=${
    verificationCode._id
  }&exp=${expiresAt.getTime()}`;

  const { data, error } = await sendEmail({
    to: user.email,
    ...getPasswordResetTemplate(url),
  });

  appAssert(
    data?.id,
    INTERNAL_SERVER_ERROR,
    `${error?.name} - ${error?.message}`
  );

  // return success message
  return {
    url,
    emailId: data?.id,
  };
};

type resetPasswordRequestType = z.infer<typeof resetPasswordValidSchemas>;
export const resetPassword = async ({
  verificationCode,
  password,
}: resetPasswordRequestType) => {
  // get verification code
  const code = await VerificationCodeModel.findOne({
    where: { id: verificationCode },
  });
  appAssert(code, CONFLICT, "Verification code is not valid!");
  // change the password
  const user = await UserModel.findOne({ id: code.userId });
  appAssert(user, NOT_FOUND, "User is not exists!");

  const updatePassword = await user.updateOne({
    password: await encryptPassword(password),
  });
  await user.save();
  appAssert(
    updatePassword,
    INTERNAL_SERVER_ERROR,
    "Failed to update password!"
  );
  // delete the verification code
  await VerificationCodeModel.findByIdAndDelete({ _id: verificationCode });
  // delete all sessions
  await SessionCodeModel.findOneAndDelete({ userId: user._id });
  // return success message
  return {
    message: "Password has been reset successfully! Please login again.",
  };
};
