import cloudinary from "../config/cloudinary";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import appAssert from "./AppAssert";

export const handleUploadImage = async (image: string) => {
  const upload = await cloudinary.uploader.unsigned_upload(
    image,
    "job-boarding",
    {
      folder: "job-boarding-images",
    }
  );

  appAssert(upload, INTERNAL_SERVER_ERROR, "Faild to upload image.");

  return upload.url;
};
