import React, { useRef } from "react";
import Inputs from "../../util/Inputs";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import Accordions from "../../util/Accordion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from '@mui/icons-material/Language';

const ProfileDetails = () => {
  const fileRef = useRef(null);
  return (
    <Accordions header="My Profile Details">
      <form>
        <div className="flex gap-5">
          <div className="flex-1" onClick={() => fileRef?.current.click()}>
            <img
              src="https://www.libera.fi/wp-content/uploads/2019/02/blank-profile-picture-973460__480.png"
              alt="profile"
              className="w-[10rem] h-[10rem] object-cover border-2 border-dashed border-gray-300 
                cursor-pointer"
            />
            <input type="file" className="hidden" ref={fileRef} />
          </div>
          <div className="flex-[1.2]">
            <h1 className="text-lg pb-2">Account Type</h1>
            <p
              className="bg-orang rounded-sm text-white py-3 w-full text-center
                text-lg pointer-events-none"
            >
              <span>
                <AccountCircleIcon
                  sx={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
                />
              </span>
              Candidate
            </p>
          </div>
        </div>

        {/* links inputs  */}
        <div className="pt-[2rem] flex flex-col gap-5">
          <Inputs label="Your Name" type="text" />
          <Inputs label="Phone Number" type="number" />
          <Inputs label="Email Address" type="email" />
          <Inputs label="Notes" type="textarea" />
          <Inputs
            label="Portfolio"
            type="text"
            icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
          />
          <Inputs
            label="LinkedIn"
            type="text"
            icon={<LinkedInIcon sx={{ fontSize: "1.2rem" }} />}
          />
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
        <button
          className="bg-orang rounded-sm text-white py-3 text-lg cursor-pointer
        w-[10rem] hover:bg-black mt-[2rem]"
        >
          Save Changes
        </button>
      </form>
    </Accordions>
  );
};

export default ProfileDetails;
