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
import InputForm from "./InputForm";

const ProfileDetails = () => {
  const fileRef = useRef(null);
  const [error, setError] = useState(false);
  const { user, update, setUpdate, profile, handleChange } = JobContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!profile.phoneNumber || !profile.notes || !profile.gender) {
      setError(true);
      window.scroll(0, 0);
    } else {
      setUpdate(false);
      console.log(profile);
    }
  };

  return (
    <Accordions header="My Profile Details">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          {/* upload image  */}
          <div className="lg:flex-1" onClick={() => fileRef?.current.click()}>
            <img
              src={
                profile.gender === "male"
                  ? "https://www.libera.fi/wp-content/uploads/2019/02/blank-profile-picture-973460__480.png"
                  : profile.gender === "female"
                  ? female
                  : noneGender
              }
              alt="profile"
              className="w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] object-cover border-2 
              border-dashed border-gray-300 cursor-pointer"
            />
            <input type="file" className="hidden" ref={fileRef} />
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
            defaultValue={profile.gender}
            value={profile.gender}
            name="gender"
            onChange={handleChange}>
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
              disabled={!update ? true : false}
            />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              disabled={!update ? true : false}
            />
          </RadioGroup>
          <FormHelperText className="!text-red-700">
            {error && "This field is required!!"}
          </FormHelperText>
        </div>

        {/* links inputs  */}
        <InputForm error={error} />

        <button
          className={`bg-orang rounded-sm text-white py-3 text-lg cursor-pointer
          w-[10rem] hover:bg-black mt-[2rem]
          ${!update && "pointer-events-none bg-gray-400"}`}>
          Save Changes
        </button>
      </form>
    </Accordions>
  );
};

export default ProfileDetails;
