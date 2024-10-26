const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
dotenv.config();

// image path
app.use("/upload", express.static(path.join(__dirname, "/upload")));

mongoose.connect(
  "mongodb+srv://miladTech:milad123@nodeandexpress.84kxwy4.mongodb.net/users?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("DB connection has been made");
});

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
app.use("/api/job", require("./routes/jobs"));
app.use("/api/user", require("./routes/users"));

const port = 8080;
app.listen(port, () => {
  console.log("application started in port:", port);
});
