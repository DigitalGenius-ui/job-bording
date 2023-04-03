import React from "react";
import { FormControl, TextField, FormHelperText } from "@mui/material";

const Input = ({ type, label, text, onCHange, name, state, isError, size }) => {
  // validation
  const inputValidation = (input) => {
    if (isError) {
      const obj = {
        error: false,
        msg: "",
      };
      if (state[input] === "") {
        obj.error = true;
        obj.msg = "This field is required!";
      }
      return obj;
    }
  };

  return (
    <FormControl fullWidth>
      <TextField
        type={type}
        label={label}
        onChange={onCHange}
        name={name}
        defaultValue={state && state[name]}
        error={inputValidation(name)?.error}
        size={size && size}
      />
      {inputValidation(name)?.error ? (
        <FormHelperText className="!text-red-700">
          {inputValidation(name)?.msg}
        </FormHelperText>
      ) : (
        <FormHelperText>{text && text}</FormHelperText>
      )}
    </FormControl>
  );
};

export default Input;
