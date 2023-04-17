const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    signupAs: { type: String, required: true },
    website: { type: String },
    userProfile: { type: String },
    gender: { type: String },
    phoneNumber: { type: String },
    notes: { type: String },
    portfolio: { type: String },
    resume: { type: String },
    linkedIn: { type: String },
    twitter: { type: String },
    telegram: { type: String },
  },
  { collection: "users" }
);

const model = mongoose.model("users", userSchema);

module.exports = model;
