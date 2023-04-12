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

  // fetch all data
  const {
    data: allJobs,
    isLoading,
    isError,
    error,
  } = useQuery("job", getAllJobs);

  const displayJob = country || category || keyword ? searchData : allJobs;

  //update profile data
  const [update, setUpdate] = useState(false);
  const [file, setFile] = useState("");
  const [profile, setProfile] = useState({
    profileImg: user?.profileImg || "",
    gender: user?.gender || "",
    fullName: user?.fullName,
    phoneNumber: user?.phoneNumber || "+62",
    email: user?.email,
    notes: user?.notes || "",
    resume: user?.resume || "",
    portfolio: user?.portfolio || "https://www.portfolio.com",
    linkedIn: user?.linkedIn || "https://www.linkedIn.com",
    twitter: user?.twitter || "https://www.twitter.com",
    telegram: user?.telegram || "https://www.telegram.com",
    companyWebsite: user?.telegram || "https://www.website.com",
  });

  const handleChange = (e) => {
    setProfile((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

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
        // update profile
        update,
        setUpdate,
        profile,
        setProfile,
        handleChange,
        file,
        setFile,
      }}>
      {children}
    </Job.Provider>
  );
};

export default Context;

export const JobContext = () => useContext(Job);
