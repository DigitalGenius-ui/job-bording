import React, { useRef, useState } from "react";
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

const ProfileDetails = () => {
  const fileRef = useRef(null);
  const [error, setError] = useState(false);
  const {
    user,
    profile,
    setProfile,
    handleChange,
    currentUser,
    updateProfile,
  } = JobContext();
  const [update, setUpdate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (profile.gender === "") {
        setError(true);
        return;
      }
      await updateProfile(profile);
      window.location.reload();
      setError(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Accordions
      header="My Profile Details"
      setUpdate={setUpdate}
      update={update}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          {/* upload image  */}
          <div
            className="lg:flex-1"
            onClick={() => {
              update && fileRef?.current.click();
            }}>
            {!profile.profileImg ? (
              <img
                src={
                  profile.gender === "male"
                    ? male
                    : profile.gender === "female"
                    ? female
                    : currentUser?.gender === "male"
                    ? male
                    : currentUser.gender === "female"
                    ? female
                    : noneGender
                }
                alt="profile"
                className="w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] object-cover border-2 
                border-dashed border-gray-300 cursor-pointer"
              />
            ) : (
              <img
                src={URL.createObjectURL(profile.profileImg)}
                alt="profile"
                className="w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] object-cover border-2 
                border-dashed border-gray-300 cursor-pointer"
              />
            )}
            <input
              name="profileImg"
              onChange={(e) =>
                setProfile({ ...profile, profileImg: e.target.files[0] })
              }
              type="file"
              className="hidden"
              ref={fileRef}
              defaultValue={currentUser?.profileImg}
            />
          </div>

          {/* profile type  */}
          <div className="flex-1 lg:flex-[1.2]">
            <h1 className="md:text-lg text-sm pb-2">
              {user.signupAs === "Condidate" ? "Account Type" : "Employer Type"}
            </h1>
            <p
              className="bg-orang rounded-sm text-white py-3 w-full text-center
                md:text-lg pointer-events-none text-sm">
              <span>
                <AccountCircleIcon
                  sx={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                />
              </span>
              {user.signupAs === "Candidate" ? "Candidate" : "Employer"}
            </p>
          </div>
        </div>

        {/* gender  */}
        <div className="mt-10">
          <FormLabel>Choose Your Gender</FormLabel>
          <RadioGroup
            row
            defaultValue={currentUser?.gender}
            name="gender"
            onChange={handleChange}>
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

        {/* links inputs  */}
        <InputForm update={update} currentUser={currentUser} />

        <button
          className={`bg-orang rounded-sm text-white py-3 text-lg cursor-pointer
          w-[10rem] hover:bg-black mt-[2rem] 
          ${!update && "pointer-events-none"}`}>
          Save Changes
        </button>
      </form>
    </Accordions>
  );
};

export default ProfileDetails;
