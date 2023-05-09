import { BaseURL } from "./BaseURL";
import axios from "axios";

// post a new job
export const postJob = async (form) => {
  try {
    const res = await axios.post(BaseURL + "/api/job/add", form);
    return res.data;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

// get all jobs and make it paginated
export const getAllJobs = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(BaseURL + `/api/job?limit=5&page=${pageParam}`);
    return res.data;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

// search job
export const searchJobs = async (country, category, keyword) => {
  try {
    const res = await axios.get(
      BaseURL +
        `/api/job?country=${country}&category=${category}&keyword=${keyword}`
    );
    return res.data.jobs;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

//get single job
export const getSingleJob = async (id) => {
  try {
    const res = await axios.get(`${BaseURL}/api/job/${id}`);
    return res.data.jobs;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

// delete a job
export const removeJob = async (id) => {
  try {
    await axios.delete(`${BaseURL}/api/job/remove/${id}`);
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};

// update a job
export const updateSingleJob = async (about) => {
  try {
    const res = await axios.put(
      `${BaseURL}/api/job/update/${about._id}`,
      about
    );
    return res.data.singleJob;
  } catch (error) {
    throw Error(error.response.data.msg);
  }
};
