import mongoose from "mongoose";

// auth model schemas
const authSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    signupAs: { type: String, required: true },
  },
  { timestamps: true, collection: "users" }
);

export const authModel = mongoose.model("users", authSchema);

// session model
const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userAgent: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true, collection: "sessions" }
);

export const sessionCodeModel = mongoose.model("sessions", sessionSchema);

// session model
export const verifyCode = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true, collection: "sessions" }
);

export const verificationCodeModel = mongoose.model("verifyCode", verifyCode);
