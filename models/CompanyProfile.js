const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    company_name: String,
    HQ: String,
    Industry: String,
    established: String,
    industry: String,
    about: String,
    culture: String,
    benefits: String,
    hiring: String,
    linkedIn: String,
    twitter: String,
    telegram: String,
    website: String,
    size: String,
  },
  { timestamps: true }
);

const companyModel = mongoose.model("companyProfile", companySchema);

module.exports = companyModel;
