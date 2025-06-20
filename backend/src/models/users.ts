import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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

const userModel = mongoose.model("users", userSchema);

export default userModel;
