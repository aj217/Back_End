const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    // Add a lesson
    router.post('/add-lesson', async (req, res) => {
        try {
            const { id, subject, location, price, spaces, image } = req.body;
            const lesson = { id, subject, location, price, spaces, image };

            const result = await db.collection('lessons').insertOne(lesson);
            res.status(201).json({ message: 'Lesson added successfully', lesson: result.ops[0] });
        } catch (error) {
            res.status(400).json({ message: 'Failed to add lesson', error: error.message });
        }
    });

    // Get all lessons
    router.get('/get-lessons', async (req, res) => {
        try {
            const lessons = await db.collection('lessons').find().toArray();
            res.status(200).json(lessons);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve lessons', error: error.message });
        }
    });

    // Add an order
    router.post('/add-order', async (req, res) => {
        try {
            const { name, phone, lessonIDs, number_of_spaces } = req.body;
            const order = { name, phone, lessonIDs, number_of_spaces };

            const result = await db.collection('orders').insertOne(order);
            res.status(201).json({ message: 'Order added successfully', order: result.ops[0] });
        } catch (error) {
            res.status(400).json({ message: 'Failed to add order', error: error.message });
        }
    });

    return router;
};
