import { BaseURL } from "./BaseURL";
import axios from "axios";

// post a new job
export const postJob = async (form) => {
  try {
    const res = await axios.post(BaseURL + "/job/add", form);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// get all jobs and make it paginated
export const getAllJobs = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(BaseURL + `/job?limit=5&page=${pageParam}`);
    return res;
  } catch (error) {
    throw error;
  }
};

// search job
export const searchJobs = async (country, category, keyword) => {
  try {
    const res = await axios.get(
      BaseURL +
        `/job?country=${country}&category=${category}&keyword=${keyword}`
    );
    return res.data.jobs;
  } catch (error) {
    throw error;
  }
};

//get single job
export const getSingleJob = async (id) => {
  try {
    const res = await axios.get(`${BaseURL}/job/${id}`);
    return res.data.jobs;
  } catch (error) {
    throw error;
  }
};

// delete a job
export const removeJob = async (id) => {
  try {
    await axios.delete(`${BaseURL}/job/remove/${id}`);
  } catch (error) {
    throw error;
  }
};

// update a job
export const updateSingleJob = async (about) => {
  try {
    const res = await axios.put(`${BaseURL}/job/update/${about._id}`, about);
    return res.data.singleJob;
  } catch (error) {
    throw error;
  }
};
