import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { JobContext } from "../../../Context/Context";

const Message = () => {
  const { alert, setAlert } = JobContext();

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Message;
