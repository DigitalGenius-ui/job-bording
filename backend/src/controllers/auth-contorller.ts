import catchError from "../utils/catchError";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import {
  emailSchema,
  loginValidSchemas,
  registerValidSchemas,
  resetPasswordValidSchemas,
} from "../schemas/auth-schema";
import {
  createAccount,
  forgotPassword,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  verifyUserEmail,
} from "../services/auth-services";
import {
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAccessToken,
  setClearCookies,
} from "../utils/cookies";
import { verifyToken } from "../utils/JWTToken";
import appAssert from "../utils/AppAssert";
import { sessionCodeModel } from "../models/auth-models";

// register user
export const registerHandler = catchError(async (req, res) => {
  const request = {
    ...req.body,
    userAgent: req.headers["user-agent"],
  };

  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAccessToken({ res, accessToken, refreshToken })
    .status(CREATED)
    .json({ message: user });
});

// login user
export const loginHanlder = catchError(async (req, res) => {
  const request = loginValidSchemas.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken, user } = await loginUser(request);
  return setAccessToken({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login successfull." });
});

// logout user
export const logOutHanlder = catchError(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(accessToken, UNAUTHORIZED, "accessToken is not provided!");

  const { payload, error } = verifyToken(accessToken, "accessToken");
  appAssert(!error, UNAUTHORIZED, "Invalid access token!");

  await sessionCodeModel.destroy({ where: { id: payload?.sessionId } });

  return setClearCookies(res)
    .status(OK)
    .json({ message: "User has been loggedout successfully!" });
});

// refresh token
export const refreshHanlder = catchError(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "refreshToken is not provided!");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed!" });
});

// verify email
export const verifyEmailHandler = catchError(async (req, res) => {
  const verifyCode = req.params.code as string | undefined;
  appAssert(verifyCode, UNAUTHORIZED, "Verify code is not provided!");

  const { user } = await verifyUserEmail(verifyCode);
  return res.status(OK).json({ message: user });
});

// forgot password
export const forgotPasswordHandler = catchError(async (req, res) => {
  const email = emailSchema.parse(req.body.email);
  appAssert(email, UNAUTHORIZED, "Email is not provided!");

  const { url, emailId } = await forgotPassword(email);

  return res.status(OK).json({ url, emailId });
});

// reset password
export const resetPasswordHandler = catchError(async (req, res) => {
  const request = resetPasswordValidSchemas.parse(req.body);
  const { verificationCode, password } = request;

  await resetPassword({ verificationCode, password });

  return setClearCookies(res)
    .status(OK)
    .json({ message: "Password reset successfully!" });
});
