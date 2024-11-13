require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const apiRouter = require("./router");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection setup
const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("SchoolStore");
    app.use("/api", apiRouter(db)); // Mount API routes with '/api' prefix
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

connectDB();

// Middleware to parse JSON bodies and handle CORS
app.use(cors());
app.use(express.json());

// Serve static files from 'frontend' folder
app.use(express.static(path.join(__dirname, "../frontend/public/images")));



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
