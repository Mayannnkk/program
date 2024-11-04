// userModel.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    studentName: { type: String },
    isProfessor:{type:Boolean},
    university: { type: String},
    collegeId: { type: String}, // Ensure college ID is unique
    password: { type: String} // Password should be hashed in practice
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create a User model based on the schema
const user = mongoose.model("users", userSchema);

module.exports = user;


