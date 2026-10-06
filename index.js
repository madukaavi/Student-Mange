const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");

const logger = require("./middleware/logger");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
console.log("🔥 MY BACKEND STARTED");
console.log("📁 FILE:", __filename);

const PORT = process.env.PORT || 5000;




app.use(express.json());

app.use(logger);




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });




app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running"
  });
});




app.use("/api/students", studentRoutes);




app.use(errorMiddleware);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});