import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "./AppError";
import mongoose from "mongoose";
// import { REFRESH_PATH, setClearCookies } from "../utils/cookies";

// zod error message display
const zodErrorHandler = (res: Response, error: z.ZodError) => {
  const errorMessage = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(BAD_REQUEST).json({ errorMessage });
};

// appassert error message display
const appErrorHandler = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

// mongo db error
const mongooseError = (res: Response, error: any) => {
  const msg = Object.values(error.errors).map((err: any) => {
    const path = err.path;
    const errorMessg = err.message;
    const cleanedMessage = errorMessg.replace(/^Path `[^`]+` /, "");
    return `${path} ${cleanedMessage}`;
  });

  return res.status(BAD_REQUEST).json({
    message: msg,
  });
};

const errorHandler: ErrorRequestHandler = async (error, req, res, next) => {
  console.log(error);
  // if (req.path === REFRESH_PATH) {
  //   setClearCookies(res);
  // }

  if (error instanceof z.ZodError) {
    zodErrorHandler(res, error);
    return;
  }

  if (error instanceof AppError) {
    appErrorHandler(res, error);
    return;
  }

  if (error instanceof mongoose.Error) {
    mongooseError(res, error);
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send(error.message);
};

export default errorHandler;
