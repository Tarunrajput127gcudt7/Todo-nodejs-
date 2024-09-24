const { Router } = require("express");
const {
  addTodo,
  fetchTodo,
  fetchOne,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const { protect, authorize } = require("../middlewares/auth");
const router = Router();

router.post("/add", protect, addTodo);
router.get("/all", fetchTodo);
router.get("/one/:id", fetchOne);
router.patch("/one/:id", protect, authorize, updateTodo);
router.delete("/one/:id", deleteTodo);

module.exports = router;
