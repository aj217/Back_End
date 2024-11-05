const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

app.use(express.json()); // For parsing JSON data in requests

let db;

async function connectDB() {
    const client = new MongoClient('your-mongodb-atlas-connection-string');
    await client.connect();
    db = client.db('schoolApp'); 
}

app.get('/', (req, res) => {
    res.send('Backend is running');
});

connectDB().then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(error => console.error("Connection failed", error));
