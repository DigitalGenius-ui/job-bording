// We are using express router, which helps us to manage the api routing files in more structured way.

const router = require("express").Router();
const jobs = require("../models/jobs");

router.post("/add", async (req, res) => {
  const {
    userId,
    job_title,
    category,
    job_type,
    position_accross_globe,
    country,
    state,
    application_link_or_email,
    job_description,
    job_posted_before,
    email_id,
    company_name,
    company_hq,
    company_mission_vission,
    company_website,
    company_description,
    salary_range,
    keyword,
  } = req.body;
  try {
    const createJob = await jobs.create({
      userId,
      job_title,
      category,
      job_type,
      position_accross_globe,
      country,
      state,
      application_link_or_email,
      job_description,
      job_posted_before,
      email_id,
      company_name,
      company_hq,
      company_mission_vission,
      company_website,
      company_description,
      salary_range,
      keyword,
    });
    console.log("Contacts created successfully", createJob);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "FAILURE", error: err });
  }
  return res.status(200).json({ status: "SUCCESS", msg: "Job has been added" });
});

router.get("/", async (req, res) => {
  const { country, category, keyword, limit, page } = req.query;
  const query = {};

  // check if the country exist in the database
  const existingCountries = await jobs.distinct("country");
  const isExistingCountry = existingCountries.includes(country);

  if (isExistingCountry) {
    query.country = country;
  }

  if (keyword || category) {
    const searchQuery = keyword || category;
    query.$or = [
      { category: { $regex: searchQuery, $options: "i" } },
      { keyword: { $regex: searchQuery, $options: "i" } },
      { country: { $regex: searchQuery, $options: "i" } },
    ];
  }

  const totalCount = await jobs.countDocuments(query);
  const skip = parseInt(page - 1) * parseInt(limit);
  const totalPages = Math.ceil(totalCount / parseInt(limit));

  try {
    const allJobs = await jobs
      .find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    res
      .status(200)
      .json({ status: "SUCCESS", jobs: allJobs, totalCount, totalPages, page });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "FAILURE", error: err });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let singleJob;
  try {
    singleJob = await jobs.findById(id);
  } catch (err) {
    return res.status(400).json({ status: "FAILURE", error: err });
  }
  return res.status(200).json({ status: "SUCCESS", jobs: singleJob });
});

module.exports = router;
