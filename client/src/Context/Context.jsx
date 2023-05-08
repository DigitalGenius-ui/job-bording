import React, { createContext, useContext, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { updateUser, allUsers } from "../FetchHook/User";

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

  // get all profiles
  const { data: allUser } = useQuery("users", allUsers);

  //update profile data
  const id = window?.location?.pathname.split("/")[2];
  const currentUser = allUser?.find((user) => user?._id === id);
  const [userProfile, setUserProfile] = useState(currentUser?.userProfile);

  const [profile, setProfile] = useState({
    _id: user?._id,
    gender: "",
    fullName: "",
    userProfile: currentUser?.userProfile,
    phoneNumber: "",
    email: "",
    notes: "",
    resume: "",
    portfolio: "",
    linkedIn: "",
    twitter: "",
    telegram: "",
    website: "",
  });
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
        // update profile
        profile,
        setProfile,
        currentUser,
        updateProfile,

        // profile image
        userProfile,
        setUserProfile,
        // all users
        allUser,
      }}>
      {children}
    </Job.Provider>
  );
};

export default Context;

export const JobContext = () => useContext(Job);
