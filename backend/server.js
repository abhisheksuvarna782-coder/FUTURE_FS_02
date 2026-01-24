const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");

require('dotenv').config();
console.log("MONGO_URI =", process.env.MONGO_URI);


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:",err));
  app.use("/api/customers", require("./routes/customerRoutes"));


// Test route
app.get("/", (req, res) => {
  res.send("Mini CRM Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
