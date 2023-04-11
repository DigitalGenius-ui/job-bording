import React, { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Inputs = ({ icon, label, type }) => {
  const inputRef = useRef();
  const [show, setShow] = useState(false);
  let inputElement = inputRef?.current;

  const handleChange = () => {
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
          <input
            type={type}
            ref={inputRef}
            readOnly={type === "email" && true}
            className="border border-gray-300 outline-none p-3 rounded-sm w-full"
          />
          {type === "password" && (
            <span
              onClick={handleChange}
              className="absolute right-1 top-3 cursor-pointer text-gray-400">
              <VisibilityIcon
                sx={{ fontSize: "1.2rem", pointerEvents: "none" }}
              />
            </span>
          )}
        </div>
      ) : (
        <textarea
          className="border border-gray-300 outline-none p-2 resize-none rounded-sm"
          cols="30"
          rows="5"></textarea>
      )}
    </div>
  );
};

export default Inputs;
