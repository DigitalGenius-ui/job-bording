import { BaseURL } from "./BaseURL";
import axios from "axios";

export const postJob = async (form) => {
  try {
    const res = await axios.post(BaseURL + "/api/job/add", form);
    return res.data;
  } catch (error) {
    throw Error("Something Went Wrong!!");
  }
};
