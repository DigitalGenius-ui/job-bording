import React, { useState } from "react";
import Accordions from "../../util/Accordion";
import { JobContext } from "../../../../Context/Context";
import Inputs from "../../util/Inputs";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const Social = () => {
  const { user, handleChange, updateProfile, currentUser, profile } =
    JobContext();
  const [update, setUpdate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Accordions
      header="Social media links"
      update={update}
      setUpdate={setUpdate}>
      {/* form part  */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row lg:flex-col gap-8">
          {user.signupAs === "Candidate" && (
            <Inputs
              label="Portfolio"
              type="text"
              onChange={handleChange}
              name="portfolio"
              update={update}
              defaultValue={currentUser?.portfolio || "https://"}
              icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
            />
          )}
          {user.signupAs === "Employer" && (
            <Inputs
              label="Company Website"
              type="text"
              onChange={handleChange}
              name="website"
              errorMsg="Full Name is required!!!"
              required={true}
              update={update}
              defaultValue={currentUser?.website || "https://"}
              icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
            />
          )}
          <Inputs
            label="LinkedIn"
            type="text"
            onChange={handleChange}
            name="linkedIn"
            update={update}
            defaultValue={currentUser?.linkedIn || "https://"}
            icon={<LinkedInIcon sx={{ fontSize: "1.2rem" }} />}
          />
        </div>

        <div className="flex flex-col md:flex-row lg:flex-col gap-8 mt-8">
          <Inputs
            label="Twitter"
            type="text"
            onChange={handleChange}
            name="twitter"
            update={update}
            defaultValue={currentUser?.twitter || "https://"}
            icon={<TwitterIcon sx={{ fontSize: "1.2rem" }} />}
          />
          <Inputs
            label="Telegram"
            type="text"
            onChange={handleChange}
            name="telegram"
            update={update}
            defaultValue={currentUser?.telegram || "https://"}
            icon={<TelegramIcon sx={{ fontSize: "1.2rem" }} />}
          />
        </div>
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

export default Social;
