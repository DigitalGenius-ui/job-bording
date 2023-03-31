// We are using express router, which helps us to manage the api routing files in more structured way.

const router = require("express").Router();
const jobs = require("../models/jobs");
const verifyUser = require("../Verify/verify");
const verify = require("../Verify/verify");

router.post("/add", async (req, res) => {
  const {
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
  } = req.body;
  try {
    const createJob = await jobs.create({
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
    });
    console.log("Contacts created successfully", createJob);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "FAILURE", error: err });
  }
  return res.status(200).json({ status: "SUCCESS", msg: "Job has been added" });
});

router.get("/", verify, async (req, res) => {
  try {
    const allJobs = await jobs.find();
    res.status(200).json({ status: "SUCCESS", jobs: allJobs });
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
