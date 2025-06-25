import express from "express";
import {
  getAllUserHandler,
  getCurrentUserHandler,
  getSingleUserHandler,
  removeResumeHandler,
  updateUserProfileHandler,
  uploadResumeHandler,
  getUserProfileHandler,
  uploadProfileImageHandler,
  updateUserPasswordHandler,
} from "../controllers/user-controllers";
import { authMiddleware } from "../middleware/authMidleware";

const router = express.Router();

router.get("/", authMiddleware, getCurrentUserHandler);
router.get("/userProfile", authMiddleware, getUserProfileHandler);
router.post("/updateUserProfile", authMiddleware, updateUserProfileHandler);
router.post("/uploadProfileImg", authMiddleware, uploadProfileImageHandler);
router.post("/changeUserPassword", authMiddleware, updateUserPasswordHandler);
router.get("/allUsers", getAllUserHandler);
router.get("/:id", getSingleUserHandler);
router.get("/download/:id", uploadResumeHandler);
router.delete("/removeResume/:id", removeResumeHandler);

export default router;
