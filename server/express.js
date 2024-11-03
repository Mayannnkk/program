// Import the express module
const express = require('express');
const cors= require('cors')
const mongoose=require('mongoose')
const User=require('./schema')
const app = express();
app.use(express.json());

app.use(cors({}))

const PORT = 5000;

app.use(express.json());

const mongoURI = 'mongodb+srv://user103:user103@cluster0.l0izu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Define a simple route
app.post('/', (req, res) => {
    const data=req.body;
    console.log(data)
    // res.send(data)
    res.json({message:'ok', data:data})
    // res.send('Hello, World!');
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});