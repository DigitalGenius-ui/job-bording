const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    userId: { type: String }, // Title of the job
    job_title: { type: String, required: true }, // Title of the job
    category: { type: String, required: true }, // Job category eg: Design
    salary_range: { type: String, required: true }, // Job category eg: Design
    job_type: { type: String, required: true }, // Type of the job eg: Full-Time/Part-Time
    position_accross_globe: { type: String, required: true }, // Whether the position open across globe eg: Yes / No
    country: { type: String, required: false }, // If the position is not across globe then country is required eg: India
    state: { type: String, required: false }, // If the position is not across globe then state is required eg: Tamil Nadu
    application_link_or_email: { type: String, required: true }, // Application link or email id to apply for the job eg: http://example.com/career or asdf@gmail.com
    job_description: { type: String, required: true }, // Job description
    job_posted_before: { type: String, required: true }, // If the user already posted the job eg: Yes / No
    email_id: { type: String, required: true }, // email id of the company / user who posting the job
    company_name: { type: String, required: true }, // name of the company
    company_hq: { type: String, required: true }, // location of the company hq
    company_mission_vission: { type: String, required: true }, // vission and mission of the company
    company_website: { type: String, required: true }, // company website link
    company_description: { type: String, required: true }, // Description about the company

    // job_posted_date: {type: String, required: true},
    // job_expiry_date: {type: String, required: true},
    // job_list_visibility: {type: String, required: true}
  },
  { collection: "jobs", timestamps: true }
);

const model = mongoose.model("jobs", jobSchema);

module.exports = model;
