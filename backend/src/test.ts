import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import { dbConnection } from "./config/db";
import { PORT } from "./constants/env";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
dotenv.config();

// image path
app.use("/upload", express.static(path.join(__dirname, "/upload")));

// uploading image for profile
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been successfully uploaded");
});

// Use the contacts.js to handle the endpoints starts with '/api/contact';
// app.use("/api/job", require("./routes/jobs"));
// app.use("/api/user", require("./routes/users"));

app.listen(PORT, () => {
  console.log("application started in port:", PORT);
  dbConnection();
});
