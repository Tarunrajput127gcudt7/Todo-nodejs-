const USER_SCHEMA = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/token");

exports.registerUser = asyncHandler(async (req, res) => {
  let { email, password, username, role } = req.body;
  let findUser = await USER_SCHEMA.findOne({ email });
  if (findUser) {
    throw new Error("user already exists.........");
  }

  let newUser = await USER_SCHEMA.create({ email, password, username, role });
  res.status(201).json({ success: true, message: "user account created", newUser });
});

// exports.login = asyncHandler(async (req, res) => {
//   let { email, password } = req.body;
//   let findUser = await USER_SCHEMA.findOne({ email });
//   if (!findUser) {
//     throw new Error("no user found...");
//   }

//   let isMatch = await findUser.matchPassword(password);

//   if (!isMatch) {
//     throw new Error("wrong password");
//   }

//   let token = generateToken(findUser._id);

//   res.cookie("myCookie", token, {
//     httpOnly: true,
//   });

//   res.status(200).json({ success: true, message: "user logged in successfully", token });
// });

// exports.logout = asyncHandler(async (req, res) => {
//   res.clearCookie("myCookie", "", { expiresIn: 0 });
//   res.status(200).json({ success: true, message: "user logged out" });
// });

exports.fetchAllUsers = asyncHandler(async (req, res) => {
  let users = await USER_SCHEMA.find({});

  if (users.length == 0) {
    throw new Error("no user found");
  }

  res.status(200).json({ success: true, message: "users fetched", users });
});

exports.fetchOne = asyncHandler(async (req, res) => {
  let user = await USER_SCHEMA.findById(req.params.id);
  if (!user) {
    throw new Error("no user found");
  }
  res.status(200).json({ success: true, message: "user fetched", user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  let user = await USER_SCHEMA.findById(req.params.id);
  if (!user) {
    throw new Error("no user found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;

  if (req.body.password) {
    user.password = req.body.password;
  }

  let updatedUser = await user.save(); //? ==> this save() is used for saving the data in the database and also triggering the pre save middleware in userSchema.js

  res.status(200).json({ success: true, message: "user updated", updatedUser });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  let user = await USER_SCHEMA.findById(req.params.id);
  if (!user) {
    throw new Error("no user found");
  }

  let deleteUser = await USER_SCHEMA.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "user deleted" });
});

exports.loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  let findUser = await USER_SCHEMA.findOne({ email });
  if (!findUser) {
    throw new Error("no user found!!!!");
  }

  let isMatch = await findUser.matchPassword(password);
  if (!isMatch) {
    throw new Error("wrong password....");
  }

  // console.log(findUser);
  let token = generateToken(findUser._id);
  // console.log(token);

  res.cookie("myCookie", token, {
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "user logged in", token });
});

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("myCookie", "", { expiresIn: "0" });

  // console.log(req.cookies);
  // console.log(res.cookie);
  res.status(200).json({ success: true, message: "user logged out" });
});
