// userModel.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    university: { type: String, required: true },
    collegeId: { type: String, required: true, unique: true }, // Ensure college ID is unique
    password: { type: String, required: true } // Password should be hashed in practice
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create a User model based on the schema
const User = mongoose.model('Users', userSchema);

module.exports = User;