import { API } from "../config/api-client";

export const signUp = async (register) => {
  try {
    const res = await API.post("/auth/sign-up", register);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const signIn = async (login) => {
  try {
    const res = await API.post("/auth/sign-in", login);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const logout = async () => {
  try {
    const res = await API.post("/auth/logout");
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
