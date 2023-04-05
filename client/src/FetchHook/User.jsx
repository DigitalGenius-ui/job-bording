import axios from "axios";
// import { BaseURL } from "./BaseURL";

export const signUp = async (register) => {
  try {
    const res = await axios.post("/api/user/sign-up", register);
    return res;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

export const signIn = async (login) => {
  try {
    const res = await axios.post("/api/user/sign-in", login);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data.user;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

// get all users
export const singleAllUsers = async () => {
  try {
    const res = await axios.get(`/api/user`);
    return res.data.allUsers;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

// get single user
export const singleUser = async (id) => {
  try {
    const res = await axios.get(`/api/user/${id}`);
    return res.data.singleUser;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

// update users
export const updateUser = async (data) => {
  try {
    const res = await axios.put(`/api/user/update/${data._id}`, data);
    return res.data.updatedUser;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};
