import React, { useRef } from "react";
import Inputs from "../../util/Inputs";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import Accordions from "../../util/Accordion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { JobContext } from "../../../../Context/Context";

const ProfileDetails = () => {
  const fileRef = useRef(null);
  const { user } = JobContext();
  return (
    <Accordions header="My Profile Details">
      <form>
        <div className="flex gap-3">
          <div className="lg:flex-1" onClick={() => fileRef?.current.click()}>
            <img
              src="https://www.libera.fi/wp-content/uploads/2019/02/blank-profile-picture-973460__480.png"
              alt="profile"
              className="w-[8rem] h-[8rem] 1114:w-[10rem] 1114:h-[10rem] object-cover border-2 
              border-dashed border-gray-300 cursor-pointer"
            />
            <input type="file" className="hidden" ref={fileRef} />
          </div>
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
              {user.signupAs === "Condidate" ? "Condidate" : "Employer"}
            </p>
          </div>
        </div>

        {/* gender  */}
        <div className="mt-10">
          <FormControl>
            <FormLabel id="job_type">Choose Your Gender</FormLabel>
            <RadioGroup
              row
              // defaultValue={aboutPosition?.job_type}
              // value={aboutPosition.job_type}
              name="job_type"
              // onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </div>

        {/* links inputs  */}
        <div className="pt-[2rem] flex flex-col gap-5">
          <div className="flex flex-col md:flex-row lg:flex-col gap-8">
            <Inputs label="Your Name" type="text" />
            <Inputs label="Phone Number" type="number" />
          </div>
          <Inputs label="Email Address" type="email" />
          <Inputs label="Notes" type="textarea" />

          {user.signupAs === "Condidate" && (
            <Inputs label="Upload Your Resume" type="file" />
          )}

          <div className="flex flex-col md:flex-row lg:flex-col gap-8">
            {user.signupAs === "Condidate" && (
              <Inputs
                label="Portfolio"
                type="text"
                icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
              />
            )}
            <Inputs
              label="LinkedIn"
              type="text"
              icon={<LinkedInIcon sx={{ fontSize: "1.2rem" }} />}
            />
          </div>

          <div className="flex flex-col md:flex-row lg:flex-col gap-8">
            <Inputs
              label="Twitter"
              type="text"
              icon={<TwitterIcon sx={{ fontSize: "1.2rem" }} />}
            />
            <Inputs
              label="Telegram"
              type="text"
              icon={<TelegramIcon sx={{ fontSize: "1.2rem" }} />}
            />
          </div>
        </div>
        <button
          className="bg-orang rounded-sm text-white py-3 text-lg cursor-pointer
        w-[10rem] hover:bg-black mt-[2rem]">
          Save Changes
        </button>
      </form>
    </Accordions>
  );
};

export default ProfileDetails;
