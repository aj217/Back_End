require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const apiRouter = require("./router");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

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

// Logger middleware
function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  if (req.method !== "GET" && req.body) {
    console.log("Request Body:", req.body);
  }
  next();
}

// Register the logger middleware
app.use(logger);

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve images with error handling for missing files
const imagesPath = path.join(__dirname, "../frontend/public/images");
const defaultImagePath = path.join(imagesPath, "default.png");

app.use("/images", (req, res, next) => {
  const filePath = path.join(imagesPath, req.url);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Log the missing file and send a 404 response
      console.error(`Image not found: ${req.url}`);
      res.status(404).send("Image not found");
    } else {
      // Serve the requested image if it exists
      res.sendFile(filePath);
    }
  });
});


// Root route to serve the index.html file from the frontend folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
