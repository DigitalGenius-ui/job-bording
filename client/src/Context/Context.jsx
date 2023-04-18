import React, { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllJobs, searchJobs } from "../FetchHook/Job";
import { updateUser, singleUser } from "../FetchHook/User";

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

  // get all profiles
  // const { data: allUsers } = useQuery("users", singleAllUsers);

  //update profile data
  const id = window.location.pathname.split("/")[2];
  const { data: currentUser, refetch: profileFetch } = useQuery(
    ["users", id],
    () => singleUser(id)
  );

  const [profile, setProfile] = useState({
    _id: user._id,
    userProfile: currentUser?.userProfile,
    password: "",
    gender: currentUser?.gender,
    fullName: currentUser?.fullName,
    phoneNumber: currentUser?.phoneNumber,
    email: currentUser?.email,
    notes: currentUser?.notes,
    resume: currentUser?.resume,
    portfolio: currentUser?.portfolio,
    linkedIn: currentUser?.linkedIn,
    twitter: currentUser?.twitter,
    telegram: currentUser?.telegram,
    website: currentUser?.website,
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();
  const { mutateAsync: updateProfile } = useMutation("users", updateUser, {
    onSuccess: () => queryClient.invalidateQueries("users"),
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
        profile,
        setProfile,
        handleChange,
        currentUser,
        updateProfile,
        // profile
        profileFetch,
      }}>
      {children}
    </Job.Provider>
  );
};

export default Context;

export const JobContext = () => useContext(Job);
