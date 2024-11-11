const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // Get all lessons
    router.post('/add-lesson', async (req, res) => {
        try {
            const lesson = {
                id: req.body.id,
                subject: req.body.subject,
                location: req.body.location,
                price: req.body.price,
                spaces: req.body.spaces,
                image: req.body.image
            };
            const result = await db.collection('lessons').insertOne(lesson);
            res.status(201).json(result.ops[0]);
        } catch (error) {
            res.status(400).json({ message: error.message });

        }
        });

        // Get all lessons from the lessons collection
    router.get('/get-lessons', async (req, res) => {
        try {
            const lessons = await db.collection('lessons').find().toArray();
            res.json(lessons);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Add an order to the orders collection
    router.post('/add-order', async (req, res) => {
        try {
            const order = {
                name: req.body.name,
                phone: req.body.phone,
                lessonIDs: req.body.lessonIDs,       
                number_of_spaces: req.body.number_of_spaces, 
            };
            const result = await db.collection('orders').insertOne(order);
            res.status(201).json(result.ops[0]);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    return router;
    };