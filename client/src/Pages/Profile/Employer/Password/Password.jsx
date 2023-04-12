import React, { useState } from "react";
import Accordions from "../../util/Accordion";
import Inputs from "../../util/Inputs";
import { JobContext } from "../../../../Context/Context";

const Password = () => {
  const { update } = JobContext();

  return (
    <Accordions header="Change Password">
      <form className="flex flex-col gap-5">
        <Inputs label="Current Password" type="password" />
        <Inputs label="New Password" type="password" />
        <Inputs label="Confirm New Password" type="password" />
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

export default Password;
