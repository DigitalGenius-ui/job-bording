import React, { createContext, useContext, useState } from "react";

const Job = createContext();

const Context = ({ children }) => {
  // Auth stats
  const [open, setOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // alert state
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
    open: false,
  });
  return (
    <Job.Provider
      value={{
        open,
        setOpen,
        activeForm,
        setActiveForm,
        user,
        setUser,
        alert,
        setAlert,
      }}
    >
      {children}
    </Job.Provider>
  );
};

export default Context;

export const JobContext = () => useContext(Job);
