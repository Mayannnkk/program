// Import the express module
const express = require('express');
const cors= require('cors')
const mongoose=require('mongoose')
const user=require('./schema')
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());


app.use(cors({}))

const PORT = 5000;

app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Define a simple route
app.post('/', async (req, res) => {
    // const data = req.body;

    // Create a new user instance
   
    const { studentName, university, collegeId, password,isProfessor } = req.body.body;
    console.log(req.body.body)
    try {
        // Save the user to the database
        
            // const hashedpassword = await bcrypt.hash(password, 10);
            const collection = await user.create({
                studentName:studentName,
                isProfessor:isProfessor,
                university:university, 
                collegeId:collegeId, 
                password:password
            })
            // delete collection.password;
            console.log(collection)
        
        res.json({ message: 'User  created successfully', data: req.body  });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error saving user', error: error.message });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});