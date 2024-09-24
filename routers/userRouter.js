const { Router } = require("express");
const {
  registerUser,
  fetchAllUsers,
  fetchOne,
  updateUser,
  deleteUser,
  loginUser,
  logout,
} = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/auth");

const router = Router();

router.post("/signup", registerUser);
router.get("/all", fetchAllUsers);
router.get("/one/:id", fetchOne);
router.patch("/one/:id", updateUser);
router.delete("/one/:id", deleteUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
