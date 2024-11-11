require('dotenv').configure;
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

const client = new MongoClient (Process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('mongodb://localhost');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
}
}

connectDB();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});