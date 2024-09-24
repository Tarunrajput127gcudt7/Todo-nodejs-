const TODO_SCHEMA = require("../models/todoModel.js");

const asyncHandler = require("express-async-handler");

exports.addTodo = asyncHandler(async (req, res) => {
  // console.log(req);
  // console.log(req.myUser);
  let { title, description, status, dueDate } = req.body;
  let newTodo = await TODO_SCHEMA.create({
    title,
    description,
    status,
    dueDate,
    createdBy: req.myUser._id,
  });
  res.status(201).json({ success: true, message: "todo created", newTodo });
});

exports.fetchTodo = asyncHandler(async (req, res) => {
  let todo = await TODO_SCHEMA.find({});
  if (todo.length == 0) {
    throw new Error("no todo found");
  }

  res.status(200).json({ success: true, message: "todo fetched", todo });
});

exports.fetchOne = asyncHandler(async (req, res) => {
  let todo = await TODO_SCHEMA.findOne({ _id: req.params.id });
  if (!todo) {
    throw new Error("no todo found");
  }

  res.status(200).json({ success: true, message: "todo fetched", todo });
});

exports.updateTodo = asyncHandler(async (req, res) => {
  let findTodo = await TODO_SCHEMA.findById(req.params.id);
  if (!findTodo) {
    throw new Error("no todo found");
  }

  let updateTodo = await TODO_SCHEMA.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ success: true, message: "todo updated", updateTodo });
});

exports.deleteTodo = asyncHandler(async (req, res) => {
  let findTodo = await TODO_SCHEMA.findById(req.params.id);
  if (!findTodo) {
    throw new Error("no todo found");
  }

  let deleteTodo = await TODO_SCHEMA.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, message: "todo deleted", deleteTodo });
});
