import React from "react";
import { FormControl, TextField, FormHelperText } from "@mui/material";

const Input = ({ type, label, text, onCHange, name, defaultValue }) => {
  return (
    <FormControl fullWidth>
      <TextField
        type={type}
        label={label}
        onChange={onCHange}
        name={name}
        defaultValue={defaultValue}
      />
      <FormHelperText>{text && text}</FormHelperText>
    </FormControl>
  );
};

export default Input;
