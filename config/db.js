const mongoose = require("mongoose");
const { MONGO } = require(".");

exports.connectDB = async () => {
  await mongoose.connect(MONGO);
  console.log("database connected");
};
