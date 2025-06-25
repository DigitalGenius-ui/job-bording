import { CircularProgress } from "@mui/material";
import React from "react";

const UpdateButton = ({ isPending, update }) => {
  return (
    <button
      type="submit"
      className={`bg-orang rounded-sm text-white py-3 text-lg cursor-pointer
    w-[10rem] hover:bg-black mt-[2rem] 
    ${!update && "pointer-events-none"}`}
    >
      {isPending ? <CircularProgress size={15} /> : "Save Changes"}
    </button>
  );
};

export default UpdateButton;
