import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { dbConnection } from "./config/db";
import { PORT } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import jobRouter from "./routes/jobs-route";
import userRouter from "./routes/users-route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

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

app.use("/job", jobRouter);
app.use("/user", userRouter);

// handling error
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("application started in port:", PORT);
  dbConnection();
});
