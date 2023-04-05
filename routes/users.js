// We are using express router, which helps us to manage the api routing files in more structured way.

const router = require("express").Router();
const bcrypt = require("bcrypt");
const users = require("../models/users");
const jwt = require("jsonwebtoken");

router.post("/sign-up", async (req, res) => {
  const {
    fullName,
    email,
    signupAs,
    company_name,
    HQ,
    established,
    industry,
    size,
    website,
    linkedIn,
    twitter,
    telegram,
    about,
    culture,
    benefits,
    hiring,
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
          company_name,
          HQ,
          established,
          industry,
          size,
          website,
          linkedIn,
          twitter,
          telegram,
          about,
          culture,
          benefits,
          hiring,
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
    res.status(200).json({ status: "SUCCESS", jobs: allUsers });
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

module.exports = router;
