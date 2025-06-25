import axios from "axios";
import { BACKEDN_URL } from "../constants/env";

const options = {
  withCredentials: true,
  baseURL: BACKEDN_URL,
};

export const API = axios.create(options);

const tokenRefreshClient = axios.create(options);
tokenRefreshClient.interceptors.response.use((response) => {
  return response.data;
});

API.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};
    if (data.errorCode === "TOKEN_NOT_FOUND" || "INVALID_TOKEN") {
      try {
        // refresh the access token, then retry the original request
        await tokenRefreshClient.get("/auth/refresh");
        await tokenRefreshClient(config);
      } catch (error) {
        throw error;
      }
    }
    return Promise.reject({ status, ...data });
  }
);
