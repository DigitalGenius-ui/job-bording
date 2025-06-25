import { API } from "../config/api-client";

// post a new job
export const postJob = async (form) => {
  try {
    const res = await API.post("/job/add", form);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// get all jobs and make it paginated
export const getAllJobs = async ({ pageParam = 1 }) => {
  try {
    const res = await API.get(`/job?limit=5&page=${pageParam}`);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// search job
export const searchJobs = async (country, category, keyword) => {
  try {
    const res = await API.get(
      `/job?country=${country}&category=${category}&keyword=${keyword}`
    );
    return res.data.jobs;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

//get single job
export const getSingleJob = async (id) => {
  try {
    const res = await API.get(`/job/${id}`);
    return res.data.jobs;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// delete a job
export const removeJob = async (id) => {
  try {
    await API.delete(`/job/remove/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// update a job
export const updateSingleJob = async (about) => {
  try {
    const res = await API.put(`/job/update/${about._id}`, about);
    return res.data.singleJob;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
