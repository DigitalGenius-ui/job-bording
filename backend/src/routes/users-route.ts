import express from "express";
import {
  getAllUserHandler,
  getSingleUserHandler,
  removeResumeHandler,
  updateUserHandler,
  uploadResumeHandler,
} from "../controllers/user-controllers";

const router = express.Router();

router.get("/", getAllUserHandler);
router.get("/:id", getSingleUserHandler);
router.put("/update/:id", updateUserHandler);
router.get("/download/:id", uploadResumeHandler);
router.delete("/removeResume/:id", removeResumeHandler);

export default router;
