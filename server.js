const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

// Auth Route
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/auth", authRoutes);

//Protected Routes
const protectedRoutes = require("./routes/protectedRoutes");
app.use("/api/protected", protectedRoutes);

//Test Route
app.get("/", (req, res) => {
  res.send("API is running....");
});

// Chat Route
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

// Admin Route
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

//MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
