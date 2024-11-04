// Import the express module
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const user = require('./schema')
const app = express();
const bcrypt = require("bcrypt");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
app.use(express.json());


app.use(cors({}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const PORT = 5000;

app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/';

// Connect to MongoDB
// Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


app.post("uploads",function(req,res){
    const file =req.files.file
    const filepath =(new Date().getTime())+"-"+file.name

    
})
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  