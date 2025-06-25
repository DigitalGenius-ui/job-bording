import React, { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateUser, allUsers, getCurrentUser } from "../api-calls/user-api";
import { USER_KEY } from "../constants/query-keys";

const Job = createContext();

const Context = ({ children }) => {
  // Auth stats
  const [open, setOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(false);

  // alert state
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
    open: false,
  });

  // get all profiles
  const { data: allUser } = useQuery({
    queryKey: ["users"],
    queryFn: allUsers,
  });

  const { data: currentUser, isPending } = useQuery({
    queryKey: [USER_KEY],
    queryFn: getCurrentUser,
  });

  //update profile data
  const id = window?.location?.pathname.split("/")[2];
  // const currentUser = allUser?.find((user) => user?._id === id);
  // const [userProfile, setUserProfile] = useState(currentUser?.userProfile);
  // const [resume, setResume] = useState(currentUser?.resume);

  const [profile, setProfile] = useState({
    _id: currentUser?._id,
    gender: "",
    fullName: "",
    // userProfile: currentUser?.userProfile,
    phoneNumber: "",
    email: "",
    notes: "",
    portfolio: "",
    linkedIn: "",
    twitter: "",
    telegram: "",
    website: "",
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile } = useMutation({
    mutationKey: ["users"],
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return (
    <Job.Provider
      value={{
        open,
        setOpen,
        activeForm,
        setActiveForm,
        currentUser,
        alert,
        setAlert,
        // update profile
        profile,
        setProfile,
        updateProfile: () => undefined,
        // profile image
        userProfile: undefined,
        setUserProfile: () => undefined,
        // resume
        resume: "",
        setResume: () => undefined,
        // all users
        allUser,
      }}
    >
      {children}
    </Job.Provider>
  );
};

export default Context;

export const UserContext = () => useContext(Job);
