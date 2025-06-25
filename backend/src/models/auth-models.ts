import mongoose from "mongoose";

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

export const SessionCodeModel = mongoose.model("sessions", sessionSchema);

// session model
const verifyCode = new mongoose.Schema(
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

export const VerificationCodeModel = mongoose.model("verifyCode", verifyCode);
