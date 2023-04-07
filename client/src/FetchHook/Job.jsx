import { BaseURL } from "./BaseURL";
import axios from "axios";

export const postJob = async (form) => {
  try {
    const res = await axios.post(BaseURL + "/api/job/add", form);
    return res.data;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

export const getAllJobs = async (country, category, keyword) => {
  try {
    const res = await axios.get(BaseURL + `/api/job`);
    return res.data.jobs;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

export const getSingleJob = async (id) => {
  try {
    const res = await axios.get(`${BaseURL}/api/job/${id}`);
    return res.data.jobs;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};
