const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    signupAs: { type: String },
    company_name: String,
    HQ: String,
    established: String,
    industry: String,
    size: String,
    website: String,
    linkedIn: String,
    twitter: String,
    telegram: String,
    // long texts
    about: String,
    culture: String,
    benefits: String,
    hiring: String,
  },
  { collection: "users" }
);

const model = mongoose.model('users', userSchema);

module.exports = model;