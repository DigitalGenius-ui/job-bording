import React, { useState } from "react";
import Accordions from "../../util/Accordion";
import Inputs from "../../util/Inputs";

const Password = () => {
  const [update, setUpdate] = useState(false);
  return (
    <Accordions header="Change Password" setUpdate={setUpdate} update={update}>
      <form className="flex flex-col gap-5">
        <Inputs update={update} label="Current Password" type="password" />
        <Inputs update={update} label="New Password" type="password" />
        <Inputs update={update} label="Confirm New Password" type="password" />
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
