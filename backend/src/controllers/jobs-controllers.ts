import catchError from "../utils/catchError";
import jobModel from "../models/jobs";
import appAssert from "../utils/AppAssert";
import { CONFLICT, CREATED, NOT_FOUND, OK } from "../constants/http";
import { getJobsSchemas } from "../schemas/jobs-schemas";
import { getAllJobs } from "../services/jobs-services";
import { idSchema } from "../schemas/general-schemas";

// create jobs
export const createJob = catchError(async (req, res) => {
  const data = req.body;
  const createJob = await jobModel.create(data);

  appAssert(createJob, CONFLICT, "Failed to create job!");

  return res.status(CREATED).json({ message: "job has been created!" });
});

// get all jobs
export const getAllJobsHandler = catchError(async (req, res) => {
  const { country, category, keyword, limit, page } = getJobsSchemas.parse(
    req.query
  );

  const { allJobs, totalPages, totalCount } = await getAllJobs({
    country,
    category,
    keyword,
    limit,
    page,
  });

  return res.status(OK).json({ allJobs, totalPages, totalCount, page });
});

// get single job
export const getSingleJobsHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);

  const jobs = await jobModel.findById(id);
  appAssert(jobs, NOT_FOUND, "Failed to get single job!");

  return res.status(OK).json({ jobs });
});

// remove job
export const removeJobHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);

  const remove = await jobModel.findByIdAndDelete(id);
  appAssert(remove, CONFLICT, "Failed to remove job!");

  return res.status(OK).json({ message: "Job has been removed!" });
});

// update job
export const updateJobHandler = catchError(async (req, res) => {
  const id = idSchema.parse(req.params.id);
  const updatedJob = await jobModel.findByIdAndUpdate(id, req.body);
  appAssert(updatedJob, CONFLICT, "Failed to update job!");

  res.status(CREATED).json({ singleJob: updatedJob });
});
