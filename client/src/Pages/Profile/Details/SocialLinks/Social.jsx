import React, { useEffect, useState } from "react";
import Accordions from "../../util/Accordion";
import { UserContext } from "../../../../Context/Context";
import Inputs from "../../util/Inputs";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinksUpdate } from "../../../../schemas/user-schema";
import useCreateData from "../../../../hooks/useCreateData";
import { USER_KEY } from "../../../../constants/query-keys";
import { updateUserProfile } from "../../../../api-calls/user-api";
import UpdateButton from "../UpdateButton";

const Social = ({ user }) => {
  const { currentUser } = UserContext();
  const [update, setUpdate] = useState(false);
  const profile = user?.profile;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(socialLinksUpdate),
    defaultValues: {
      portfolio: "https://",
      website: "https://",
      linkedIn: "https://",
      twitter: "https://",
      telegram: "https://",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        portfolio: profile?.portfolio,
        website: profile?.website,
        linkedIn: profile?.linkedIn,
        twitter: profile?.twitter,
        telegram: profile?.telegram,
      });
    }
  }, [user, reset, profile]);

  const { submitData, isPending } = useCreateData({
    key: [USER_KEY],
    func: updateUserProfile,
  });

  const onSubmit = async (values) => {
    await submitData({
      inputData: { ...values, profileId: profile?._id },
      alertMsg: "Social Links have been successfully updated",
    });

    setUpdate(false);
  };
  return (
    <Accordions
      header="Social media links"
      update={update}
      currentUser={currentUser}
      setUpdate={setUpdate}
    >
      {/* form part  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row lg:flex-col gap-8">
          {user?.signupAs === "Candidate" && (
            <Inputs
              label="Portfolio"
              type="text"
              register={register}
              name="portfolio"
              update={update}
              icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
              errors={errors}
            />
          )}
          {user?.signupAs === "Employer" && (
            <Inputs
              label="Company Website"
              type="text"
              register={register}
              name="website"
              errorMsg="Full Name is required!!!"
              required={true}
              update={update}
              icon={<LanguageIcon sx={{ fontSize: "1.2rem" }} />}
              errors={errors}
            />
          )}
          <Inputs
            label="LinkedIn"
            type="text"
            register={register}
            name="linkedIn"
            update={update}
            icon={<LinkedInIcon sx={{ fontSize: "1.2rem" }} />}
            errors={errors}
          />
        </div>

        <div className="flex flex-col md:flex-row lg:flex-col gap-8 mt-8">
          <Inputs
            label="Twitter"
            type="text"
            register={register}
            name="twitter"
            update={update}
            icon={<TwitterIcon sx={{ fontSize: "1.2rem" }} />}
            errors={errors}
          />
          <Inputs
            label="Telegram"
            type="text"
            register={register}
            name="telegram"
            update={update}
            icon={<TelegramIcon sx={{ fontSize: "1.2rem" }} />}
            errors={errors}
          />
        </div>
        {update && <UpdateButton update={update} isPending={isPending} />}
      </form>
    </Accordions>
  );
};

export default Social;
