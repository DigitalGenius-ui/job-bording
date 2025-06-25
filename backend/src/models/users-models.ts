import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    website: { type: String, default: "" },
    userImg: { type: String, default: "" },
    gender: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    notes: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    resume: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    twitter: { type: String, default: "" },
    telegram: { type: String, default: "" },
  },
  { collection: "profile" }
);

export const ProfileModel = mongoose.model("profile", profileSchema);

// auth model schemas
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    signupAs: { type: String, required: true },
    verified: { type: Boolean, default: false },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
  },
  { timestamps: true, collection: "users" }
);

export const UserModel = mongoose.model("users", userSchema);
