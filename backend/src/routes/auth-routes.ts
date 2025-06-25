import express from "express";
import {
  forgotPasswordHandler,
  loginHanlder,
  logOutHanlder,
  refreshHanlder,
  registerHandler,
  resetPasswordHandler,
  verifyEmailHandler,
} from "../controllers/auth-contorller";

const router = express.Router();

router.post("/sign-up", registerHandler);
router.post("/sign-in", loginHanlder);
router.post("/logout", logOutHanlder);
router.get("/refresh", refreshHanlder);
router.post("/verify/email/:code", verifyEmailHandler);
router.post("/forgot/password", forgotPasswordHandler);
router.post("/reset/password", resetPasswordHandler);

export default router;
