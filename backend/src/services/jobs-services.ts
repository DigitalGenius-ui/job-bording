import jobModel from "../models/jobs";
import appAssert from "../utils/AppAssert";
import { CONFLICT, NOT_FOUND } from "../constants/http";

type getJobsParams = {
  country?: string;
  category?: string;
  keyword?: string;
  limit?: string;
  page?: string;
};

export const getAllJobs = async ({
  country,
  category,
  keyword,
  limit,
  page,
}: getJobsParams) => {
  // check if the country exist in the database
  const query: Record<string, any> = {
    country: "",
    category: "",
    keyword: "",
  };

  if (country) {
    const existingCountries = await jobModel.distinct("country");
    const isExistingCountry = existingCountries.includes(country);

    if (isExistingCountry) {
      query.country = country;
    }
  }

  if (keyword || category) {
    const searchQuery = keyword || category;
    query.$or = [
      { category: { $regex: searchQuery, $options: "i" } },
      { keyword: { $regex: searchQuery, $options: "i" } },
      { country: { $regex: searchQuery, $options: "i" } },
    ];
  }

  const totalCount = await jobModel.countDocuments(query);
  const pageNumber = page ? Number(page) : 1;
  const limitNumber = limit ? Number(limit) : 10;

  const skip = (pageNumber - 1) * limitNumber;
  const totalPages = Math.ceil(totalCount / limitNumber);

  const allJobs = await jobModel
    .find(query)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip(Number(skip));

  appAssert(allJobs, NOT_FOUND, "Failed to get all jobs!");

  return { allJobs, totalPages, totalCount };
};
