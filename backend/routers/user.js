const express = require("express");
const userRoute = express.Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

userRoute.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, secret);

        res.status(200).json({
            message: "user created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token, // Send the JWT token in the response
        });
    } catch (err) {
        console.log("Error during signup:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

userRoute.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: existingUser._id }, secret, { expiresIn: '1h' });

        // Respond with user data and token
        res.status(200).json({
            message: "User signed in successfully",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
            token, // Send the JWT token in the response
        });
    } catch (err) {
        console.log("Error during signin:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = userRoute;