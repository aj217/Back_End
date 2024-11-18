const express = require("express");
const { MongoClient } = require("mongodb");
const apiRouter = require("./router");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const PropertiesReader = require("properties-reader");

// Load properties from conf/db.properties
const propertiesPath = path.resolve(__dirname, "./conf/db.properties");
const properties = PropertiesReader(propertiesPath);

// Retrieve database configuration
const dbPrefix = properties.get("db.prefix");
const dbUser = encodeURIComponent(properties.get("db.user"));
const dbPwd = encodeURIComponent(properties.get("db.pwd"));
const dbUrl = properties.get("db.dbUrl");
const dbParams = properties.get("db.params");
const dbName = properties.get("db.dbName");

// Construct MongoDB URI
const MONGODB_URI = `${dbPrefix}${dbUser}:${dbPwd}${dbUrl}${dbParams}`;
const PORT = properties.get("app.port") || 5000;

// MongoDB connection setup
const client = new MongoClient(MONGODB_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    app.use("/api", apiRouter(db)); // Mount API routes with '/api' prefix
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

connectDB();

const app = express();

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
