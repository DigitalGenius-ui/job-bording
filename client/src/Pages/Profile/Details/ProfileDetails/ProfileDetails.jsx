import React, { useEffect, useRef, useState } from "react";
import Accordions from "../../util/Accordion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { JobContext } from "../../../../Context/Context";
import noneGender from "../../../../images/question.png";
import female from "../../../../images/female.jpg";
import male from "../../../../images/male.jpg";
import InputForm from "./InputForm";

const ProfileDetails = ({ currentUser, profileFetch }) => {
  const fileRef = useRef(null);
  const [error, setError] = useState(false);
  const [imgPrev, setImgPrev] = useState("");
  const {
    user,
    profile,
    setProfile,
    updateProfile,
    setAlert,
    userProfile,
    setUserProfile,
  } = JobContext();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // when the user navigate between profiles, data should be updated
      setProfile({
        ...profile,
        gender: currentUser?.gender,
        fullName: currentUser?.fullName,
        phoneNumber: currentUser?.phoneNumber,
        email: currentUser?.email,
        notes: currentUser?.notes,
        resume: currentUser?.resume,
        portfolio: currentUser?.portfolio,
        linkedIn: currentUser?.linkedIn,
        twitter: currentUser?.twitter,
        telegram: currentUser?.telegram,
        website: currentUser?.website,
      });
      setUserProfile("");
      profileFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileFetch, currentUser]);

  const folder = process.env.REACT_APP_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user?.signupAs !== "Employer" && profile.gender === "") {
        setError(true);
        setAlert({
          type: "error",
          message: "Please specify your Gender",
          open: true,
        });
        return;
      }
      const data = {
        userProfile,
        profile,
      };
      await updateProfile(data);
      setUpdate(false);
      setAlert({
        type: "success",
        message: "Profile has been successfully updated",
        open: true,
      });
      setError(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Accordions
      header={`${currentUser?._id === user?._id ? "My" : ""} Profile Details`}
      setUpdate={setUpdate}
      currentUser={currentUser}
      update={update}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          {/* upload image  */}
          <div
            className="lg:flex-1"
            onClick={() => {
              update && fileRef?.current.click();
            }}>
            {/* for previewing the profile while uploading  */}
            {userProfile ? (
              <img
                src={imgPrev}
                alt="profile"
                className={`w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] object-cover border-2 
                border-dashed border-gray-300 
                ${update ? "cursor-pointer" : "pointer-events-none"}`}
              />
            ) : // displaying the user profile if exist in the database
            currentUser?.userProfile ? (
              <img
                src={folder + currentUser?.userProfile}
                alt="profile"
                className={`w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] object-cover border-2 
                border-dashed border-gray-300 
                ${update ? "cursor-pointer" : "pointer-events-none"}`}
              />
            ) : // if the user is an employer
            user?.signupAs === "Employer" ? (
              <div
                className={`w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] border-2 text-gray-500
                border-dashed border-gray-300 flex items-center justify-center text-center text-2xl
                ${update ? "cursor-pointer" : "pointer-events-none"}`}>
                COMPANY <br /> PROFILE
              </div>
            ) : (
              // if the user is a candidate
              <img
                src={
                  profile.gender === "male"
                    ? male
                    : profile.gender === "female"
                    ? female
                    : currentUser?.gender === "male"
                    ? male
                    : currentUser?.gender === "female"
                    ? female
                    : noneGender
                }
                alt="profile"
                className={`w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] object-cover border-2 
                border-dashed border-gray-300 
                ${update ? "cursor-pointer" : "pointer-events-none"}`}
              />
            )}
            {/* input for uploading the profile image  */}
            <input
              name="userProfile"
              onChange={(e) => {
                setUserProfile(e.target.files[0]);
                e.target.files.length !== 0 &&
                  setImgPrev(URL.createObjectURL(e.target.files[0]));
              }}
              type="file"
              className="hidden"
              ref={fileRef}
            />
          </div>

          {/* profile type  */}
          <div className="flex-1 lg:flex-[1.2]">
            <h1 className="md:text-lg text-sm pb-2">
              {currentUser?.signupAs === "Candidate"
                ? "Account Type"
                : "Employer Type"}
            </h1>
            <p
              className="bg-orang rounded-sm text-white py-3 w-full text-center
                md:text-lg pointer-events-none text-sm">
              <span>
                <AccountCircleIcon
                  sx={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                />
              </span>
              {currentUser?.signupAs === "Candidate" ? "Candidate" : "Employer"}
            </p>
          </div>
        </div>

        {/* gender  */}
        {currentUser?.signupAs === "Candidate" ? (
          <div className="mt-10">
            <FormLabel>{`${
              currentUser?._id === user?._id ? "Choose Your" : null
            } Gender`}</FormLabel>
            <RadioGroup
              row
              name="gender"
              onChange={(e) =>
                setProfile({ ...profile, gender: e.target.value })
              }
              value={profile.gender}>
              <FormControlLabel
                value="male"
                control={<Radio disabled={update ? false : true} />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                control={<Radio disabled={update ? false : true} />}
                label="Female"
              />
            </RadioGroup>
            <FormHelperText className="!text-red-700">
              {error && "This field is required!!"}
            </FormHelperText>
          </div>
        ) : null}

        {/* links inputs  */}
        <InputForm update={update} currentUser={currentUser} />

        {user?._id === currentUser?._id && (
          <button
            className={`bg-orang rounded-sm text-white py-3 text-lg cursor-pointer
            w-[10rem] hover:bg-black mt-[2rem] 
          ${!update && "pointer-events-none"}`}>
            Save Changes
          </button>
        )}
      </form>
    </Accordions>
  );
};

export default ProfileDetails;
