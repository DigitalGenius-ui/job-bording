import axios from "axios";
import { BaseURL } from "./BaseURL";

export const signUp = async (register) => {
  try {
    const res = await axios.post(BaseURL + "/api/user/sign-up", register);
    return res;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

export const signIn = async (login) => {
  try {
    const res = await axios.post(BaseURL + "/api/user/sign-in", login);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data.user;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};
