const express = require("express");
const { PORT } = require("./config/index");
const { connectDB } = require("./config/db.js");
const { error } = require("./middlewares/error.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const cors = require("cors");

const userRoute = require("./routers/userRouter.js");
const todoRoute = require("./routers/todoRouter.js");

// const { protect } = require("./middlewares/auth.js");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use("/users", userRoute);
app.use("/todo", todoRoute);

app.use(error);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Express server listening on port 9000");
});
