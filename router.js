const express = require("express");
const { ObjectId } = require("mongodb"); // Import ObjectId for MongoDB operations

module.exports = (db) => {
  const router = express.Router();

  // Helper function to validate order data on the server
  const validateOrderData = (name, phone) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return nameRegex.test(name) && phoneRegex.test(phone);
  };

  // Route to add a new lesson
  router.post("/add-lesson", async (req, res) => {
    try {
      const { subject, location, price, spaces, image } = req.body;

      // Validate incoming lesson data
      if (
        !subject ||
        !location ||
        typeof price !== "number" ||
        typeof spaces !== "number"
      ) {
        return res.status(400).json({ message: "Invalid lesson data" });
      }

      const lesson = { subject, location, price, spaces, image };
      const result = await db.collection("lessonlist").insertOne(lesson);

      res
        .status(201)
        .json({
          message: "Lesson added successfully",
          lessonId: result.insertedId,
        });
    } catch (error) {
      console.error("Error adding lesson:", error.message);
      res
        .status(500)
        .json({ message: "Failed to add lesson", error: error.message });
    }
  });

  // Route to retrieve all lessons
  router.get("/get-lessons", async (req, res) => {
    try {
      const lessons = await db.collection("lessonlist").find().toArray();
      res.status(200).json(lessons);
    } catch (error) {
      console.error("Error retrieving lessons:", error.message);
      res
        .status(500)
        .json({ message: "Failed to retrieve lessons", error: error.message });
    }
  });

  // Route to update a lesson by ID
  router.put("/update-lesson/:id", async (req, res) => {
    try {
      const lessonId = req.params.id;
      const updateData = req.body;

      const result = await db
        .collection("lessonlist")
        .updateOne({ _id: new ObjectId(lessonId) }, { $set: updateData });

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      res.status(200).json({ message: "Lesson updated successfully" });
    } catch (error) {
      console.error("Error updating lesson:", error.message);
      res
        .status(500)
        .json({ message: "Failed to update lesson", error: error.message });
    }
  });

  // Route to add a new order
  router.post("/add-order", async (req, res) => {
    try {
      const { name, phone, lessonIDs, number_of_spaces } = req.body;

      // Validate order data for name and phone format
      if (!validateOrderData(name, phone)) {
        return res
          .status(400)
          .json({ message: "Invalid name or phone format" });
      }

      const order = { name, phone, lessonIDs, number_of_spaces };
      const result = await db.collection("orders").insertOne(order);

      // Adjust lesson spaces based on the order
      for (const lessonId of lessonIDs) {
        await db
          .collection("lessonlist")
          .updateOne(
            { _id: new ObjectId(lessonId) },
            { $inc: { spaces: -number_of_spaces } }
          );
      }

      res
        .status(201)
        .json({
          message: "Order added successfully",
          orderId: result.insertedId,
        });
    } catch (error) {
      console.error("Error adding order:", error.message);
      res
        .status(500)
        .json({ message: "Failed to add order", error: error.message });
    }
  });

  return router;
};
