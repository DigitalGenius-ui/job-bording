import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("✅ MongoDB connected");
  } catch (error: any) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};
