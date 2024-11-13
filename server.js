require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const apiRouter = require("./router");
const cors = require('cors');
const path = require("path");


const app = express();
const PORT = process.env.PORT || 5000;

console.log("MongoDB URI:", process.env.MONGODB_URI); // Debugging line

if (!process.env.MONGODB_URI) {
  console.error("MongoDB URI not set in .env file");
  process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('SchoolStore');
    // Mount the API router after connecting to the database
    app.use("/api", apiRouter(db)); // Pass the db instance to the router here
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

connectDB();

app.use(express.json()); // Middleware to parse JSON request bodies

// Serve static files from the 'images' folder
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cors());


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
