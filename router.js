const express = require("express");
const { ObjectId } = require("mongodb"); // Import ObjectId

module.exports = (db) => {
  const router = express.Router();

  // Add a lesson
  router.post("/add-lesson", async (req, res) => {
    try {
      const { subject, location, price, spaces, image } = req.body;
      const lesson = { subject, location, price, spaces, image };

      console.log("Attempting to insert lesson into 'SchoolStore.lessons':", lesson);
      const result = await db.collection("lessonlist").insertOne(lesson);

      console.log("Insertion result:", result);
      res.status(201).json({ message: "Lesson added successfully", lessonId: result.insertedId });
    } catch (error) {
      console.error("Error inserting lesson:", error.message);
      res.status(400).json({ message: "Failed to add lesson", error: error.message });
    }
  });

  // Update a lesson by ID
  router.put("/update-lesson/:id", async (req, res) => {
    try {
      const lessonId = req.params.id;
      const updateData = req.body;

      const result = await db.collection("lessonlist").updateOne(
        { _id: new ObjectId(lessonId) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      res.status(200).json({ message: "Lesson updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "Failed to update lesson", error: error.message });
    }
  });

  // Get all lessons
  router.get("/get-lessons", async (req, res) => {
    try {
      const lessons = await db.collection("lessonlist").find().toArray();
      res.status(200).json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve lessons", error: error.message });
    }
  });

  // Add an order
  router.post("/add-order", async (req, res) => {
    try {
      const { name, phone, lessonIDs, number_of_spaces } = req.body;
      const order = { name, phone, lessonIDs, number_of_spaces };

      const result = await db.collection("orders").insertOne(order);
      res.status(201).json({ message: "Order added successfully", orderId: result.insertedId });
    } catch (error) {
      res.status(400).json({ message: "Failed to add order", error: error.message });
    }
  });

  return router;
};
