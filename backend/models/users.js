const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // Removes extra spaces
        },
        email: { 
            type: String,
            required: true,
            unique: true, // Ensures emails are unique
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Basic email regex
                "Please provide a valid email address",
            ],
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
const userModel =  mongoose.model("user", userSchema);
module.exports = userModel;
