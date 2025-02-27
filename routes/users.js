// We are using express router, which helps us to manage the api routing files in more structured way.

const router = require("express").Router();
const bcrypt = require("bcrypt");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const path = require("path");

router.post("/sign-up", async (req, res) => {
  const {
    fullName,
    email,
    signupAs,
    userProfile,
    gender,
    phoneNumber,
    notes,
    website,
    portfolio,
    resume,
    linkedIn,
    twitter,
    telegram,
  } = req.body;

  let { password } = req.body;
  try {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    password = await bcrypt.hash(password, salt);

    users.findOne({ email: email }, async (err, user) => {
      if (err) {
        return res.status(400).json({ status: "FAILURE", error: err });
      }
      if (user) {
        return res
          .status(400)
          .json({ status: "FAILURE", error: err, msg: "User already exist" });
      } else {
        const createUser = await users.create({
          fullName,
          email,
          password,
          signupAs,
          linkedIn,
          twitter,
          telegram,
          website,
          userProfile,
          gender,
          phoneNumber,
          notes,
          portfolio,
          resume,
        });
        console.log("User created successfully", createUser);
        return res
          .status(200)
          .json({ status: "SUCCESS", msg: "User has been added", createUser });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "FAILURE", error: err });
  }
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  users.findOne({ email: email }, async (err, user) => {
    if (err) {
      return res.status(400).json({ status: "FAILURE", error: err });
    }
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      const accessToken = jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );

      if (validPassword) {
        return res
          .cookie("token", accessToken, {
            httpOnly: true,
          })
          .status(200)
          .json({
            status: "SUCCESS",
            msg: "User logged in successfully",
            user: user,
            accessToken,
          });
      } else {
        return res
          .status(400)
          .json({ status: "FAILURE", msg: "Wrong password" });
      }
    } else {
      return res.status(400).json({
        status: "FAILURE",
        msg: "Please sign up if you are not a registered user.",
      });
    }
  });
});

// get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).json({ status: "SUCCESS", allUsers: allUsers });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "FAILURE", error: err });
  }
});

// get single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await users.findById(id);
    res.status(200).json({ status: "SUCCESS", singleUser: singleUser });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "FAILURE", error: err });
  }
});

// update user
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await users.findByIdAndUpdate(id, req.body);
    res.status(200).json({ status: "SUCCESS", singleUser: updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "FAILURE", error: err });
  }
});

// download resume
router.get("/download/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findFile = await users.findById(id);
    if (!findFile) {
      throw new Error("No File is found.");
    }
    const file = findFile.resume;
    const filePath = path.join(__dirname, `../upload/${file}`);
    res.download(filePath);
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", error: err });
  }
});

// remove resume
router.delete("/removeResume/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResume = await users.findByIdAndUpdate(
      { _id: id },
      { $set: { resume: "" } },
      { new: true }
    );

    if (!updatedResume) {
      return res
        .status(404)
        .json({ status: "FAILURE", error: "User not found." });
    }

    res.status(200).json({ status: "SUCCESS", msg: "file has been deleted" });
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", error: err });
  }
});

module.exports = router;
