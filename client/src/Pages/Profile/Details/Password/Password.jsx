import React, { useState } from "react";
import Accordions from "../../util/Accordion";
import Inputs from "../../util/Inputs";
import { UserContext } from "../../../../Context/Context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../../../schemas/user-schema";
import useCreateData from "../../../../hooks/useCreateData";
import { USER_KEY } from "../../../../constants/query-keys";
import { updateUserPassword } from "../../../../api-calls/user-api";
import UpdateButton from "../UpdateButton";

const Password = () => {
  const [update, setUpdate] = useState(false);
  const { currentUser } = UserContext();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const { submitData, isPending } = useCreateData({
    key: [USER_KEY],
    func: updateUserPassword,
  });

  const onSubmit = async (values) => {
    await submitData({
      inputData: values,
      alertMsg: "Profile has been successfully updated",
    });
    setUpdate(false);
    reset();
  };

  return (
    <Accordions
      header="Change Password"
      setUpdate={setUpdate}
      currentUser={currentUser}
      update={update}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Inputs
          required={true}
          update={update}
          label="Current Password"
          type="password"
          register={register}
          errors={errors}
          name="currentPassword"
        />
        <Inputs
          required={true}
          update={update}
          label="New Password"
          type="password"
          register={register}
          errors={errors}
          name="newPassword"
        />
        <Inputs
          required={true}
          update={update}
          label="Confirm New Password"
          type="password"
          register={register}
          errors={errors}
          name="confirmPassword"
        />
        {update && <UpdateButton isPending={isPending} update={update} />}
      </form>
    </Accordions>
  );
};

export default Password;
