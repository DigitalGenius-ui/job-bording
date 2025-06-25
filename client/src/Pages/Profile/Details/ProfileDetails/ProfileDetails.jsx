import React, { useEffect, useState } from "react";
import Accordions from "../../util/Accordion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { UserContext } from "../../../../Context/Context";
import InputForm from "./InputForm";
import { Controller, useForm } from "react-hook-form";
import { profileSchema } from "../../../../schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import UploadImage from "./UploadImage";
import useCreateData from "../../../../hooks/useCreateData";
import { USER_KEY } from "../../../../constants/query-keys";
import { updateUserProfile } from "../../../../api-calls/user-api";
import UpdateButton from "../UpdateButton";

const ProfileDetails = ({ user }) => {
  const { currentUser } = UserContext();
  const [update, setUpdate] = useState(false);

  const profile = currentUser?.profile;

  const { id: userId } = useParams();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user?.fullName,
        phoneNumber: user?.profile?.phoneNumber,
        email: user?.email,
        notes: user?.profile?.notes,
        gender: user?.profile?.gender,
        resume: user?.profile?.resume,
      });
    }
  }, [user, reset]);

  const { submitData, isPending } = useCreateData({
    key: [USER_KEY],
    func: updateUserProfile,
  });

  const onSubmit = async (values) => {
    await submitData({
      inputData: { ...values, profileId: profile._id },
      alertMsg: "Profile has been successfully updated",
    });
    setUpdate(false);
  };

  return (
    <Accordions
      header={`${currentUser?._id === userId ? "My" : ""} Profile Details`}
      setUpdate={setUpdate}
      currentUser={currentUser._id === userId}
      update={update}
    >
      <div className="flex gap-3">
        <UploadImage update={update} user={user} />

        {/* profile type  */}
        <div className="flex-1 lg:flex-[1.2]">
          <h1 className="md:text-lg text-sm pb-2">
            {currentUser?.signupAs === "Candidate"
              ? "Account Type"
              : "Employer Type"}
          </h1>
          <p
            className="bg-orang rounded-sm text-white py-3 w-full text-center
                md:text-lg pointer-events-none text-sm"
          >
            <span>
              <AccountCircleIcon
                sx={{ fontSize: "1.4rem", marginRight: "0.4rem" }}
              />
            </span>
            {currentUser?.signupAs === "Candidate" ? "Candidate" : "Employer"}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* gender  */}
        {currentUser?.signupAs === "Candidate" ? (
          <div className="mt-10">
            <FormLabel>
              {`${
                currentUser?._id === user?._id ? "Choose Your" : null
              } Gender`}
            </FormLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="male"
                    control={<Radio disabled={!update} />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio disabled={!update} />}
                    label="Female"
                  />
                </RadioGroup>
              )}
            />
          </div>
        ) : null}

        {/* links inputs  */}
        <InputForm
          user={user}
          errors={errors}
          register={register}
          update={update}
        />

        {update && <UpdateButton isPending={isPending} update={update} />}
      </form>
    </Accordions>
  );
};

export default ProfileDetails;
