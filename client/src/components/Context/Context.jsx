import React, { createContext, useContext, useState } from "react";

const Job = createContext();

const Context = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Job.Provider
      value={{
        open: open,
        setOpen: setOpen,
      }}
    >
      {children}
    </Job.Provider>
  );
};

export default Context;

export const JobContext = () => useContext(Job);
