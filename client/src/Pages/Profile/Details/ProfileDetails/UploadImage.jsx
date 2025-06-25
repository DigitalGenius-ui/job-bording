import { useRef, useState } from "react";
import { UserContext } from "../../../../Context/Context";
import { useParams } from "react-router-dom";
import noneGender from "../../../../images/question.png";
import female from "../../../../images/female.jpg";
import male from "../../../../images/male.jpg";
import clsx from "clsx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { IconButton, Tooltip } from "@mui/material";
import useCreateData from "../../../../hooks/useCreateData";
import { USER_KEY } from "../../../../constants/query-keys";
import { uploadProfileImg } from "../../../../api-calls/user-api";

const UploadImage = ({ update, user }) => {
  const { currentUser } = UserContext();
  const fileRef = useRef(null);
  const [imgPrev, setImgPrev] = useState("");

  const profile = user?.profile;

  const { id: userId } = useParams();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    imageBase24(file);
  };

  const imageBase24 = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPrev(reader.result);
      };
    } else {
      setImgPrev("");
    }
  };

  const { submitData, isPending } = useCreateData({
    key: [USER_KEY],
    func: uploadProfileImg,
  });

  const data = {
    profileId: profile?._id,
    userImg: imgPrev,
  };

  const handleImgUpload = async () => {
    await submitData({
      inputData: data,
      alertMsg: "Profile has been uploaded!",
    });
    setImgPrev("");
  };

  const profileImg =
    profile?.gender === "male"
      ? male
      : profile?.gender === "female"
      ? female
      : noneGender;

  return (
    <div>
      {/* upload image  */}
      <div
        className={clsx("lg:flex-1", isPending && "opacity-60")}
        onClick={() => {
          update && fileRef?.current.click();
        }}
      >
        {/* for previewing the profile while uploading  */}
        {user?._id === userId ? (
          <>
            <img
              src={imgPrev || profile?.userImg || profileImg}
              alt="profile"
              className={clsx(
                `w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] object-cover border-2 
              border-dashed border-gray-300`,
                update && "cursor-pointer border-gray-500"
              )}
            />
          </>
        ) : // if the user is an employer
        currentUser?.signupAs === "Employer" ? (
          <div
            className={clsx(
              `w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] border-2 text-gray-500
                border-dashed border-gray-300 flex items-center justify-center text-center text-2xl poin`,
              update && "cursor-pointer"
            )}
          >
            COMPANY <br /> PROFILE
          </div>
        ) : (
          // if the user is a candidate
          <img
            src={profileImg}
            alt="profile"
            className={`w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] object-cover border-2 
            border-dashed border-gray-300 
            ${update ? "cursor-pointer" : "pointer-events-none"}`}
          />
        )}
        {/* input for uploading the profile image  */}
        <input
          name="userProfile"
          onChange={handleImgChange}
          type="file"
          className="hidden"
          ref={fileRef}
          accept="image/png, image/jpeg, image/jpg, image/webp"
        />
      </div>
      {imgPrev && (
        <>
          <Tooltip title="Upload Image">
            <IconButton onClick={handleImgUpload} size="small" color="success">
              <FaCloudUploadAlt />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton
              onClick={() => setImgPrev("")}
              size="small"
              color="error"
            >
              <LiaTimesSolid />
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default UploadImage;
