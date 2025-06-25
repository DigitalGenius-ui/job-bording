import catchError from "../utils/catchError";
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../constants/http";
import appAssert from "../utils/AppAssert";
import { idSchema } from "../schemas/general-schemas";
import path from "path";
import { ProfileModel, UserModel } from "../models/users-models";
import { changeUserPassword, updateImage } from "../services/user-service";
import { updateUserImg, updateUserPassword } from "../schemas/user-schema";

// get all user data
export const getAllUserHandler = catchError(async (req, res) => {
  const allUsers = await UserModel.find();
  appAssert(allUsers, NOT_FOUND, "Failed to find all users data!");
  return res.status(OK).json(allUsers);
});

// get single user
export const getCurrentUserHandler = catchError(async (req, res) => {
  const id = req.userId;
  appAssert(id, UNAUTHORIZED, "You are authorized to access ths route!");

  const user = await UserModel.findById(id).populate("profile");
  appAssert(user, NOT_FOUND, "Failed to find user data!");

  return res.status(OK).json(user);
});

// get single user
export const getSingleUserHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);
  const singleUser = await UserModel.findById(id).populate("profile");

  appAssert(singleUser, NOT_FOUND, "Failed to find user data!");

  return res.status(OK).json(singleUser);
});

// get User profile
export const getUserProfileHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);

  const userId = req.userId;
  appAssert(userId, UNAUTHORIZED, "You are authorized to access this route!");

  const profile = await ProfileModel.findById(id);
  appAssert(profile, NOT_FOUND, "Failed to find profile!");

  return res.status(OK).json(profile);
});

// update user
export const updateUserProfileHandler = catchError(async (req, res) => {
  const { profileId, ...rest } = req.body;
  appAssert(profileId, NOT_FOUND, "Profile id is not provided!");

  const userId = req.userId;
  appAssert(userId, UNAUTHORIZED, "You are authorized to access this route!");

  const update = await ProfileModel.findOneAndUpdate({ _id: profileId }, rest);
  appAssert(update, INTERNAL_SERVER_ERROR, "Failed update profile!");

  return res.status(OK).json({ message: "Profile has been updated!" });
});

// update user profile
export const uploadProfileImageHandler = catchError(async (req, res) => {
  const { profileId, userImg } = updateUserImg.parse(req.body);

  const userId = req.userId;
  appAssert(userId, UNAUTHORIZED, "You are authorized to access this route!");

  const { updateProfileImg } = await updateImage({ userImg, profileId });

  return res.status(OK).json({ updateProfileImg });
});

// update user profile
export const updateUserPasswordHandler = catchError(async (req, res) => {
  const data = updateUserPassword.parse(req.body);

  const userId = req.userId;
  appAssert(userId, UNAUTHORIZED, "You are authorized to access this route!");

  await changeUserPassword(data, userId);

  return res.status(OK).json({ message: "Password has been changed!" });
});

// upload Resume
export const uploadResumeHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);

  const findFile = await ProfileModel.findById(id);
  appAssert(findFile, NOT_FOUND, "No file is found!");

  const file = findFile.resume;
  const filePath = path.join(__dirname, `../upload/${file}`);

  return res.download(filePath);
});

// remove Resume
export const removeResumeHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);

  const updatedResume = await ProfileModel.findByIdAndUpdate(
    { _id: id },
    { $set: { resume: "" } },
    { new: true }
  );

  appAssert(updatedResume, NOT_FOUND, "User not found.");

  return res.status(OK).json({ message: "file has been deleted" });
});
