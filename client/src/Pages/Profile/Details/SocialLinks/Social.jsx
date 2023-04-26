import React, { useState } from "react";
import Accordions from "../../util/Accordion";
import { JobContext } from "../../../../Context/Context";
import Inputs from "../../util/Inputs";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const Social = ({ currentUser }) => {
  const { user, setProfile, updateProfile, profile, setAlert, userProfile } =
    JobContext();
  const [update, setUpdate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userProfile,
      profile,
    };
    try {
      await updateProfile(data);
      setUpdate(false);
      setAlert({
        type: "success",
        message: "Social Links have been successfully updated",
        open: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Accordions
      header="Social media links"
      update={update}
      currentUser={currentUser}
      setUpdate={setUpdate}>
      {/* form part  */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row lg:flex-col gap-8">
          {currentUser?.signupAs === "Candidate" && (
            <Inputs
              label="Portfolio"
              type="text"
              onChange={(e) =>
                setProfile({ ...profile, portfolio: e.target.value })
              }
              name="portfolio"
              update={update}
              value={profile.portfolio || "https://"}
              icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
            />
          )}
          {currentUser?.signupAs === "Employer" && (
            <Inputs
              label="Company Website"
              type="text"
              onChange={(e) =>
                setProfile({ ...profile, website: e.target.value })
              }
              name="website"
              errorMsg="Full Name is required!!!"
              required={true}
              update={update}
              value={profile.website || "https://"}
              icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
            />
          )}
          <Inputs
            label="LinkedIn"
            type="text"
            onChange={(e) =>
              setProfile({ ...profile, linkedIn: e.target.value })
            }
            name="linkedIn"
            update={update}
            value={profile.linkedIn || "https://"}
            icon={<LinkedInIcon sx={{ fontSize: "1.2rem" }} />}
          />
        </div>

        <div className="flex flex-col md:flex-row lg:flex-col gap-8 mt-8">
          <Inputs
            label="Twitter"
            type="text"
            onChange={(e) =>
              setProfile({ ...profile, twitter: e.target.value })
            }
            name="twitter"
            update={update}
            value={profile.twitter || "https://"}
            icon={<TwitterIcon sx={{ fontSize: "1.2rem" }} />}
          />
          <Inputs
            label="Telegram"
            type="text"
            onChange={(e) =>
              setProfile({ ...profile, telegram: e.target.value })
            }
            name="telegram"
            update={update}
            value={profile.telegram || "https://"}
            icon={<TelegramIcon sx={{ fontSize: "1.2rem" }} />}
          />
        </div>
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

export default Social;
