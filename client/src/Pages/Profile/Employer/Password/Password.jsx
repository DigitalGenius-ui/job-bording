import React from "react";
import Accordions from "../../util/Accordion";
import Inputs from "../../util/Inputs";

const Password = () => {
  return (
    <Accordions header="Change Password">
      <form className="flex flex-col gap-5">
        <Inputs label="Current Password" type="password" />
        <Inputs label="New Password" type="password" />
        <Inputs label="Confirm New Password" type="password" />
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

export default Password;
