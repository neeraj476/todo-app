const express = require("express");
const listRoute = express.Router();
const listModel = require("../models/list");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        // Look for the token in the 'Authorization' header
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user; // Attach user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Authorization error:", err);
        res.status(401).json({ message: "Not authorized" });
    }
};






// Create a new to-do list
listRoute.post("/create", authMiddleware, async (req, res) => {
    const { title, description, isComplete } = req.body;

    try {
        const newList = new listModel({
            title,
            description,
            isComplete,
            createdBy: req.user._id, // Using authenticated user's ID
        });

        await newList.save();
        res.status(201).json({ message: "List created successfully", newList });
    } catch (err) {
        console.error("Error creating list:", err);  // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
});

// Test route to ensure the server is working
listRoute.get("/all", authMiddleware, async (req, res) => {
    try {
        // Get all lists created by the authenticated user
        const lists = await listModel.find({ createdBy: req.user._id });
        // If no lists are found, return an appropriate message
        if (!lists || lists.length === 0) {
            return res.status(404).json({ message: "No lists found" });
        }

        // Respond with the lists
        res.status(200).json({
            message: "Lists fetched successfully",
            lists,
        });
    } catch (err) {
        console.error("Error fetching lists:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

listRoute.put("/update/:id", authMiddleware, async (req, res) => {
    const { title, description, isComplete } = req.body;
    const listId = req.params.id; // The ID of the list you want to update

    try {
        // Find the list by ID and ensure it was created by the current user
        const list = await listModel.findOne({ _id: listId, createdBy: req.user._id });

        if (!list) {
            return res.status(404).json({ message: "List not found or you are not authorized to update it." });
        }

        // Update the list properties
        list.title = title || list.title;
        list.description = description || list.description;
        list.isComplete = isComplete !== undefined ? isComplete : list.isComplete;

        // Save the updated list
        await list.save();

        res.status(200).json({ message: "List updated successfully", updatedList: list });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
listRoute.delete("/delete/:id", authMiddleware, async (req, res) => {
    const listId = req.params.id; // The ID of the list to be deleted

    try {
        // Find the list by ID and ensure it was created by the current user
        const list = await listModel.findOneAndDelete({ _id: listId, createdBy: req.user._id });

        if (!list) {
            return res.status(404).json({ message: "List not found or you are not authorized to delete it." });
        }

        res.status(200).json({ message: "List deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = listRoute;
