import React, { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { JobContext } from "../../../Context/Context";

const Inputs = ({
  icon,
  label,
  type,
  onChange,
  errorMsg,
  name,
  required,
  pattern,
  update,
  accept,
}) => {
  const inputRef = useRef();
  const [show, setShow] = useState(false);
  const { profile } = JobContext();

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
          <div>
            <input
              type={type}
              ref={inputRef}
              size="small"
              readOnly={type === "email" || !update ? true : false}
              className={`border border-gray-300 !outline-none p-3 rounded-sm w-full
              invalid:border-red-500 input ${
                type === "file" && !update && "pointer-events-none"
              }`}
              onChange={onChange}
              defaultValue={type === "password" ? "*****" : profile[name]}
              required={required}
              name={name}
              pattern={pattern}
              accept={accept}
            />
            <span className={`text-sm text-red-600 error`}>{errorMsg}</span>
          </div>
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
        <>
          <textarea
            className="border border-gray-300 outline-none p-2 resize-none rounded-sm
            text-sm invalid:border-red-400 input"
            cols="30"
            rows="5"
            placeholder="Your Notes..."
            readOnly={!update ? true : false}
            name={name}
            defaultValue={profile[name]}
            required
            minLength={10}
            onChange={onChange}></textarea>
          <span className={`text-sm text-red-600 error`}>{errorMsg}</span>
        </>
      )}
    </div>
  );
};

export default Inputs;
