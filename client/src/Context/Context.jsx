import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { getAllJobs, searchJobs } from "../FetchHook/Job";

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

  // search states
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [keyword, setKeyWord] = useState("");

  const {
    isLoading: searchLoading,
    isError: searchError,
    refetch,
    data: searchData,
  } = useQuery("job", () => searchJobs(country, category, keyword), {
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  // fetch all datas
  const {
    data: allJobs,
    isLoading,
    isError,
    error,
  } = useQuery("job", getAllJobs);

  const displayJob = country || category || keyword ? searchData : allJobs

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
        isLoading,
        isError,
        error,
        userData,
        setUserData,
        displayJob,
        // search states
        setCountry,
        setCategory,
        keyword,
        setKeyWord,
        searchLoading,
        searchError,
        refetch,
        country,
        category,
      }}
    >
      {children}
    </Job.Provider>
  );
};

export default Context;

export const JobContext = () => useContext(Job);
