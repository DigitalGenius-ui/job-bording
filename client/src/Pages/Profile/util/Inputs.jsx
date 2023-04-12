import React, { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { JobContext } from "../../../Context/Context";
import { OutlinedInput } from "@mui/material";

const Inputs = ({ icon, label, type, handleChange, value, error, name }) => {
  const inputRef = useRef();
  const [show, setShow] = useState(false);
  const { update } = JobContext();

  let inputElement = inputRef?.current;

  const handlePassword = () => {
    setShow(!show);
    if (type === "password") {
      !show ? (inputElement.type = "text") : (inputElement.type = "password");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <span className="pb-2 flex items-center gap-2">
        {icon && icon}
        {label}
      </span>
      {type !== "textarea" ? (
        <div className="relative">
          <OutlinedInput
            type={type}
            ref={inputRef}
            size="small"
            readOnly={type === "email" || !update ? true : false}
            className="border border-gray-300 !outline-none p-1 rounded-sm w-full"
            onChange={handleChange}
            defaultValue={value}
            nam={name}
          />
          {type === "password" && (
            <span
              onClick={handlePassword}
              className="absolute right-1 top-3 cursor-pointer text-gray-400">
              <VisibilityIcon
                sx={{ fontSize: "1.2rem", pointerEvents: "none" }}
              />
            </span>
          )}
        </div>
      ) : (
        <OutlinedInput
          className="border border-gray-300 outline-none p-2 resize-none rounded-sm"
          cols="30"
          rows="5"
          placeholder="Your Notes..."
          readOnly={!update ? true : false}
          multiline
          defaultValue={value}
          error={error ? true : false}
          onChange={handleChange}></OutlinedInput>
      )}
    </div>
  );
};

export default Inputs;
