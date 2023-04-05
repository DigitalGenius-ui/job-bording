import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { getAllJobs } from "../FetchHook/Job";

const Job = createContext();

const Context = ({ children }) => {
  // Auth stats
  const [open, setOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // alert state
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
    open: false,
  });

  // fetch all datas
  const {
    data: allJobs,
    isLoading,
    isError,
    error,
  } = useQuery("job", getAllJobs);

  //update employer data
  const [userData, setUserData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    company_name: "",
    HQ: "",
    established: "",
    industry: "",
    size: "",
    about: "",
    website: "",
    linkedIn: "",
    twitter: "",
    telegram: "",
    culture: "",
    benefits: "",
    hiring: "",
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

        // fetch all jobs
        allJobs,
        isLoading,
        isError,
        error,
        userData,
        setUserData,
      }}
    >
      {children}
    </Job.Provider>
  );
};

export default Context;

export const JobContext = () => useContext(Job);
