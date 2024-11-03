// server.js (or your main server file)
const express = require('express');
const mongoose = require('mongoose');
const User = require('./schema'); // Import the User model
const app = express();
const bcrypt = require('bcrypt');
const cors= require('cors')
const PORT =  5000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors({}))
// app.use(cors({
//     origin: 'http://localhost:3000', // Allow only this origin
//     methods: ['GET', 'POST'], // Allow only specific HTTP methods
//     credentials: true // Allow credentials (if needed)
// }));

// MongoDB connection string
const mongoURI = 'mongodb+srv://user103:user103@cluster0.l0izu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Route to create a new user
app.post('/user', async (req, res) => {
    const { studentName, university, collegeId, password } = req.body;
    console.log(req.body)
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser  = new User({
        studentName,
        university,
        collegeId,
        password: hashedPassword // Note: Password should be hashed before saving
    });

    try {
        const savedUser  = await newUser .save();
        res.status(201).json(savedUser );
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route to get all users (for testing purposes)
app.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});