const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user-data", authMiddleware, (req, res) => {
  res.json({
    message: `Hello, ${req.user.email}. You are logged in as ${req.user.role}.`,
  });
});

router.get("/admin-data", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin! You have full control." });
});

module.exports = router;
