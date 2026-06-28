const express = require("express");
const router = express.Router();

const {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getMyRegistrations
} = require("../controllers/registrationController");

const authMiddleware=require("../middleware/authMiddleware");
router.get("/my", authMiddleware, getMyRegistrations);
router.post("/",authMiddleware,createRegistration);
router.get("/", getRegistrations);
router.get("/:id", getRegistrationById);
router.put("/:id", updateRegistration);
router.delete("/:id", deleteRegistration);

module.exports = router;

