// router.post("/sign-up", signUpHanlder);

// router.post("/sign-in", async (req, res) => {
//   const { email, password } = req.body;
//   users.findOne({ email: email }, async (err, user) => {
//     if (err) {
//       return res.status(400).json({ status: "FAILURE", error: err });
//     }
//     if (user) {
//       const validPassword = await bcrypt.compare(password, user.password);
//       const accessToken = jwt.sign(
//         { email: user.email, id: user._id },
//         process.env.SECRET_KEY,
//         { expiresIn: "5d" }
//       );

//       if (validPassword) {
//         return res
//           .cookie("token", accessToken, {
//             httpOnly: true,
//           })
//           .status(200)
//           .json({
//             status: "SUCCESS",
//             msg: "User logged in successfully",
//             user: user,
//             accessToken,
//           });
//       } else {
//         return res
//           .status(400)
//           .json({ status: "FAILURE", msg: "Wrong password" });
//       }
//     } else {
//       return res.status(400).json({
//         status: "FAILURE",
//         msg: "Please sign up if you are not a registered user.",
//       });
//     }
//   });
// });
