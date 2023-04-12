import React, { useState } from "react";
import Accordions from "../../util/Accordion";
import { JobContext } from "../../../../Context/Context";
import Inputs from "../../util/Inputs";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const Social = () => {
  const [error, setError] = useState(false);
  const { user, handleChange, profile, update } = JobContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !profile.portfolio ||
      !profile.linkedIn ||
      !profile.twitter ||
      !profile.telegram
    ) {
      setError(true);
      window.scroll(0, 0);
    }
  };

  return (
    <Accordions header=" Social media links">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row lg:flex-col gap-8">
          {user.signupAs === "Candidate" && (
            <Inputs
              label="Portfolio"
              type="text"
              onChange={handleChange}
              name="portfolio"
              value={profile.portfolio}
              icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
            />
          )}
          {user.signupAs === "Employer" && (
            <Inputs
              label="Company Website"
              type="text"
              onChange={handleChange}
              name="portfolio"
              value={profile.portfolio}
              icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
            />
          )}
          <Inputs
            label="LinkedIn"
            type="text"
            onChange={handleChange}
            name="linkedIn"
            value={profile.linkedIn}
            icon={<LinkedInIcon sx={{ fontSize: "1.2rem" }} />}
          />
        </div>

        <div className="flex flex-col md:flex-row lg:flex-col gap-8 mt-8">
          <Inputs
            label="Twitter"
            type="text"
            onChange={handleChange}
            name="twitter"
            value={profile.twitter}
            icon={<TwitterIcon sx={{ fontSize: "1.2rem" }} />}
          />
          <Inputs
            label="Telegram"
            type="text"
            onChange={handleChange}
            name="telegram"
            value={profile.telegram}
            icon={<TelegramIcon sx={{ fontSize: "1.2rem" }} />}
          />
        </div>
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

export default Social;
