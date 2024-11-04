const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    submittedBy: { type: String, required: true }, // The person who submitted the post
    professor: { type: Boolean }, // Indicates if the submitter is a professor
    university: { type: String, required: true }, // The university associated with the post
    title: { type: String, required: true }, // Title of the post
    description: { type: String, required: true }, // Description of the post
    codeFile: { type: String }, // URL or path to the code file
    imageFile: { type: String } // URL of the image file
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create a Post model based on the schema
const project = mongoose.model("Post", postSchema);

module.exports = project;