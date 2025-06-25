import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormError from "../../../utils/FormError";
import clsx from "clsx";

const Inputs = ({
  icon,
  label,
  type,
  name,
  update,
  accept,
  register,
  errors,
}) => {
  const [inputType, setInputType] = useState(type);

  const handlePassword = () => {
    if (type === "password") {
      setInputType((prev) => (prev === "password" ? "text" : "password"));
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
              type={inputType}
              size="small"
              readOnly={type === "email" || !update ? true : false}
              className={clsx(
                "border border-gray-300 !outline-none p-3 rounded-sm w-full",
                errors && errors[name]?.message && "border-red-500 input",
                !update && "pointer-events-none",
                update && "border-black/60 text-black/70"
              )}
              name={name}
              accept={accept}
              {...register(name)}
            />
            <FormError errors={errors} name={name} />
          </div>
          {type === "password" && (
            <span
              onClick={handlePassword}
              className="absolute right-1 top-3 cursor-pointer text-gray-400"
            >
              <VisibilityIcon
                sx={{ fontSize: "1.2rem", pointerEvents: "none" }}
              />
            </span>
          )}
        </div>
      ) : (
        <>
          <textarea
            className={clsx(
              `border border-gray-300 outline-none p-2 resize-none rounded-sm text-sm input`,
              errors && errors[name]?.message && "border-red-400"
            )}
            cols="30"
            rows="5"
            placeholder="Your Notes..."
            readOnly={!update ? true : false}
            name={name}
            minLength={10}
            {...register(name)}
          ></textarea>
          <FormError errors={errors} name={name} />
        </>
      )}
    </div>
  );
};

export default Inputs;
