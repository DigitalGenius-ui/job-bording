import clsx from "clsx";
import React from "react";

const FormError = ({ errors, name, classname }) => {
  return (
    <p className={clsx("text-lRead text-sm w-full", classname)}>
      {errors && errors[name]?.message ? String(errors[name]?.message) : null}
    </p>
  );
};

export default FormError;
