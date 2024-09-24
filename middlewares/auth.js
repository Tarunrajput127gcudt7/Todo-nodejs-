const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const USER_SCHEMA = require("../models/userModel");
const { JWT_SECRET } = require("../config");

exports.protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.myCookie;
  if (token) {
    console.log(token);
    let decodedToken = jwt.verify(token, JWT_SECRET);
    console.log(decodedToken);
    let user = await USER_SCHEMA.findById(decodedToken.id);
    console.log(user);
    req.myUser = user;
    next();
  } else {
    throw new Error("no token found");
  }
});

exports.authorize = asyncHandler(async (req, res, next) => {
  console.log(req.myUser);
  if (req.myUser.role === "admin") {
    next();
  } else {
    throw new Error("not authorized");
  }
});
