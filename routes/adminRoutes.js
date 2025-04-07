const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const Faq = require("../models/Faq");

const router = express.Router();

// Middleware to check for admin role
const adminCheck = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
};

// Create FAQ
router.post("/faqs", authMiddleware, adminCheck, async (req, res) => {
  const { question, answer } = req.body;
  const faq = new Faq({ question, answer });
  await faq.save();
  res.json(faq);
});

// Read all FAQs
router.get("/faqs", authMiddleware, adminCheck, async (req, res) => {
  const faqs = await Faq.find();
  res.json(faqs);
});

// Update FAQ
router.put("/faqs/:id", authMiddleware, adminCheck, async (req, res) => {
  const { question, answer } = req.body;
  const updated = await Faq.findByIdAndUpdate(
    req.params.id,
    { question, answer },
    { new: true }
  );
  res.json(updated);
});

router.post("/faqs", authMiddleware, adminCheck, async (req, res) => {
  console.log("REQ.USER:", req.user); // check role
  console.log("FAQ BODY:", req.body); // check form data

  const { question, answer } = req.body;
  if (!question || !answer) {
    return res
      .status(400)
      .json({ message: "Question and Answer are required" });
  }

  try {
    const faq = new Faq({ question, answer });
    await faq.save();
    res.json(faq);
  } catch (error) {
    console.error("SAVE ERROR:", error);
    res.status(500).json({ message: "Failed to save FAQ" });
  }
});

// Delete FAQ
router.delete("/faqs/:id", authMiddleware, adminCheck, async (req, res) => {
  await Faq.findByIdAndDelete(req.params.id);
  res.json({ message: "FAQ deleted" });
});

module.exports = router;
