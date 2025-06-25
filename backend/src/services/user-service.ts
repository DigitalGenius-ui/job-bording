import { z } from "zod";
import { ProfileModel, UserModel } from "../models/users-models";
import { updateUserImg, updateUserPassword } from "../schemas/user-schema";
import appAssert from "../utils/AppAssert";
import { BAD_REQUEST, CONFLICT, NOT_FOUND } from "../constants/http";
import { handleUploadImage } from "../utils/handleUpdateImage";
import { checkPasswords, encryptPassword } from "../utils/BcryptJS";

// update profile image
type updateProfile = z.infer<typeof updateUserImg>;

export const updateImage = async ({ userImg, profileId }: updateProfile) => {
  const result = await handleUploadImage(userImg);
  appAssert(result, CONFLICT, "Failed to upload image!");

  const updateProfileImg = await ProfileModel.findByIdAndUpdate(
    { _id: profileId },
    {
      userImg: result,
    }
  );

  appAssert(
    updateProfileImg,
    CONFLICT,
    "Failed to update image in teh database!"
  );

  return {
    updateProfileImg,
  };
};

type changePassType = z.infer<typeof updateUserPassword>;

export const changeUserPassword = async (
  data: changePassType,
  userId: string
) => {
  const { currentPassword, newPassword } = data;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User is not exist!");

  const isPasswordValied = await checkPasswords(
    currentPassword,
    user?.password
  );
  appAssert(isPasswordValied, BAD_REQUEST, "Wrong password!");

  const password = await encryptPassword(newPassword);

  const updatePassword = await UserModel.findByIdAndUpdate(userId, {
    password,
  });

  appAssert(updatePassword, CONFLICT, "Failed to update your password!");

  return {
    updatePassword,
  };
};
