import catchError from "../utils/catchError";
import userModel from "../models/users";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/AppAssert";
import { idSchema } from "../schemas/general-schemas";
import path from "path";

// get all user data
export const getAllUserHandler = catchError(async (req, res) => {
  const allUsers = await userModel.find();
  appAssert(allUsers, NOT_FOUND, "Failed to find all users data!");
  return res.status(OK).json({ allUsers });
});

// get single user
export const getSingleUserHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);
  const singleUser = await userModel.findById(id);
  appAssert(singleUser, NOT_FOUND, "Failed to find user data!");

  return res.status(OK).json({ singleUser });
});

// update user
export const updateUserHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);
  const updatedUser = await userModel.findByIdAndUpdate(id, req.body);
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to update user data!");

  return res.status(OK).json({ singleUser: updatedUser });
});

// upload Resume
export const uploadResumeHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);

  const findFile = await userModel.findById(id);
  appAssert(findFile, NOT_FOUND, "No file is found!");

  const file = findFile.resume;
  const filePath = path.join(__dirname, `../upload/${file}`);

  return res.download(filePath);
});

// remove Resume
export const removeResumeHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);

  const updatedResume = await userModel.findByIdAndUpdate(
    { _id: id },
    { $set: { resume: "" } },
    { new: true }
  );

  appAssert(updatedResume, NOT_FOUND, "User not found.");

  return res.status(OK).json({ message: "file has been deleted" });
});
