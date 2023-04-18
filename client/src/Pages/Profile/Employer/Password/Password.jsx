import React, { useState } from "react";
import Accordions from "../../util/Accordion";
import Inputs from "../../util/Inputs";
import { JobContext } from "../../../../Context/Context";

const Password = () => {
  const [update, setUpdate] = useState(false);
  const { profile, onChange } = JobContext();
  return (
    <Accordions header="Change Password" setUpdate={setUpdate} update={update}>
      <form className="flex flex-col gap-5">
        <Inputs
          required={true}
          update={update}
          label="Current Password"
          type="password"
          onChange={onChange}
          name="password"
          errorMsg="Please type your current password"
        />
        <Inputs
          required={true}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          update={update}
          label="New Password"
          type="password"
          onChange={onChange}
          name="newPassword"
          errorMsg="Your password should contain at least one number and one capital latter"
        />
        <Inputs
          required={true}
          pattern={profile?.password}
          update={update}
          label="Confirm New Password"
          type="password"
          onChange={onChange}
          name="confirmPassword"
          errorMsg="Passwords are not match!!"
        />
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

export default Password;
