const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema(
    {
        title: {
            type: String,
            required: true, // Corrected "require" to "required"
        },
        description: { 
            type: String,
            default: "", // Optional with a default value
        },
        isComplete: {
            type: Boolean,
            default: false, // Default value for the completion status
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, // Assuming this references a User model
            ref: "user", // Reference the User model
            required: true,
        },
    }
);


const listModel = mongoose.model("List", listSchema);

module.exports = listModel;
