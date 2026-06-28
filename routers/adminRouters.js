const express = require("express");
const router = express.Router();

const {
  signupAdmin,
  loginAdmin,
  getAllUsers
} = require("../controllers/adminController");

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);

router.get("/users", getAllUsers);
module.exports = router;