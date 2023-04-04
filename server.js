const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
dotenv.config();

mongoose.connect(
  "mongodb+srv://miladTech:milad123@nodeandexpress.84kxwy4.mongodb.net/users?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("DB connection has been made");
});

// Use the contacts.js to handle the endpoints starts with '/api/contact';
app.use("/api/job", require("./routes/jobs"));
app.use("/api/user", require("./routes/users"));

const port = 8080;
app.listen(port, () => {
  console.log("application started in port:", port);
});
