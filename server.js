require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('MongoDB URI:', process.env.MONGODB_URI);  // Debugging line

if (!process.env.MONGODB_URI) {
    console.error('MongoDB URI not set in .env file');
    process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI); 

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
}

connectDB();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
