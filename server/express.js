// Import the express module
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./schema');
const app = express();
const bcrypt = require("bcrypt");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(express.json());
app.use(cors({}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const PORT = 5000;
const mongoURI = 'mongodb://localhost:27017';

// Connect to MongoDB
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Set the collection name for GridFS
});

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define project schema
const projectSchema = new mongoose.Schema({
    studentName: String,
    university: String,
    projectTitle: String,
    projectDescription: String,
    codeFile: String,
    imageFile: String,
    likes: Number,
    comments:Array,
    rating:Number,
    feedback:String,
    tag:String
});

const Project = mongoose.model('Project', projectSchema);

// Storage setup for multer
const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        if (file.mimetype !== 'application/zip') {
            return null; // Ensure only zip files are accepted
        }
        return {
            filename: `zip-${Date.now()}-${file.originalname}`,
            bucketName: 'uploads' // Collection name
        };
    }
});

const upload = multer({ storage });

// Upload endpoint
app.post('/uploads', upload.fields([{ name: 'codeFile' }, { name: 'imageFile' }]), async (req, res) => {
    const { studentName, university, projectTitle, projectDescription,tag } = req.body;

    // Check if both files are uploaded
    if (!req.files || !req.files.codeFile || !req.files.imageFile) {
        return res.status(400).json({ message: 'Both code and image files are required' });
    }

    const newProject = new Project({
        studentName,
        university,
        projectTitle,
        projectDescription,
        codeFile: req.files.codeFile[0].filename,
        imageFile: req.files.imageFile[0].filename,
        likes:0,
        comments:[],
        rating:0,
        feedback:"",
        tag:tag
    });
    console.log(newProject)
    try {
        await newProject.save(); // Save project details in the database
        res.json({
            message: 'Files and project details uploaded successfully',
            projectDetails: new Project
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ message: 'Error uploading files', error: error.message });
    }
});

// Get all uploaded projects and their files

// Get a file from GridFS by filename
// Get a file from GridFS by filename and return it in Base64 format
// Get a file from GridFS by filename

// Get all uploaded files
app.get('/files', async (req, res) => {
    try {
        
        const files = await Project.find();
        res.json(files);
        console.log(files)
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Error fetching files' });
    }
});

// Get a file from GridFS by filename and return it in Base64 format
app.get('/file/:filename', async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Check if the file is a zip file
        if (file.contentType !== 'application/zip') {
            return res.status(400).json({ message: 'Not a zip file' });
        }

        // Create a read stream to read the file from GridFS
        const readStream = gfs.createReadStream(file.filename);
        const chunks = [];

        readStream.on('data', (chunk) => {
            chunks.push(chunk);
        });

        readStream.on('end', () => {
            // Buffer the chunks and convert to base64
            const buffer = Buffer.concat(chunks);
            const base64 = buffer.toString('base64');
            res.json({ base64 }); // Respond with the Base64 representation
        });

        readStream.on('error', (err) => {
            console.error('Error reading file:', err);
            res.status(500).json({ message: 'Error reading file' });
        });
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ message: 'Error fetching file' });
    }
});

// POST route to upload project data
app.post('/uploadproject', async (req, res) => {
    const { studentName, university, projectTitle, projectDescription, codeFile, imageFile,tag } = req.body;

    // Validate required fields
    if (!studentName || !university || !projectTitle || !projectDescription || !imageFile) {
        return res.status(400).json({ message: 'All fields are required except codeFile' });
    }

    const newProject = new Project({
        studentName,
        university,
        projectTitle,
        projectDescription,
        codeFile: codeFile || null, // Set codeFile to null if not provided
        imageFile,
        likes:0,
        comments:[],
        rating:0,
        feedback:"",
        tag

    });

    try {
        await newProject.save(); // Save project details in the database
        res.status(200).json({
            message: 'Project uploaded successfully',
            project: newProject
        });
    } catch (error) {
        console.error('Error saving project:', error);
        res.status(500).json({ message: 'Error saving project', error: error.message });
    }
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find(); // Fetch all projects
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }
        // console.log(projects)
        res.json(projects); // Respond with the list of projects
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
});

// app.get('/myprojects', async (req, res) => {
//     try {
//         const {currentuserdata}=req.body
//         const projects = await Project.find({studentName:currentuserdata.studentName}); // Fetch all projects
//         if (!projects || projects.length === 0) {
//             return res.status(404).json({ message: 'No projects found' });
//         }
//         // console.log(projects)
//         res.json(projects); // Respond with the list of projects
//     } catch (error) {
//         console.error('Error fetching projects:', error);
//         res.status(500).json({ message: 'Error fetching projects', error: error.message });
//     }
// });

// Get a project by ID
app.get('/projects/:id', async (req, res) => {
    const { id } = req.params; // Get the project ID from the request parameters

    try {
        const project = await Project.findById(id); // Fetch the project from the database by ID

        if (!project) {
            return res.status(404).json({ message: 'Project not found' }); // Handle case where project is not found
        }

        res.json(project); // Respond with the project details
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Error fetching project', error: error.message }); // Handle any errors
    }
});
// Assuming you have already imported necessary modules and set up your Express app

// PUT route to update project details
app.put('/projects/:id', async (req, res) => {
    const { id } = req.params; // Get the project ID from the request parameters
    const { projectTitle, projectDescription } = req.body.body; // Extract updated fields from request body
    // console.log(req.body.body)
    try {
        // Find the project by ID and update it
        const updatedProject = await Project.findByIdAndUpdate(id, {
            projectTitle:projectTitle,
            projectDescription:projectDescription,
            
            // Include any other fields you want to update
        }, { new: true }); // The new option returns the updated document
        // console.log(updatedProject)
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({
            message: 'Project updated successfully',
            project: updatedProject
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
});
app.put('/projectfeedback/:id', async (req, res) => {
    const { id } = req.params; // Get the project ID from the request parameters
    const { feedback,rating } = req.body; // Extract updated fields from request body
    // console.log(req.body.body)
    try {
        // Find the project by ID and update it
        const updatedProject = await Project.findByIdAndUpdate(id, {
            feedback: feedback,
            rating: rating,
            
            // Include any other fields you want to update
        }, { new: true }); // The new option returns the updated document
        // console.log(updatedProject)
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({
            message: 'Project updated successfully',
            project: updatedProject
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
});
app.put('/projectlike/:id', async (req, res) => {
    const { id } = req.params; // Get the project ID from the request parameters
    const { likes } = req.body; // Extract updated fields from request body
    // console.log(req.body.body)
    try {
        // Find the project by ID and update it
        const updatedProject = await Project.findByIdAndUpdate(id, {
            likes:likes
            
            // Include any other fields you want to update
        }, { new: true }); // The new option returns the updated document
        // console.log(updatedProject)
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({
            message: 'Project updated successfully',
            project: updatedProject
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
});
app.put('/projectcomment/:id', async (req, res) => {
    const { id } = req.params; // Get the project ID from the request parameters
    const { comments } = req.body; // Extract updated fields from request body
    // console.log(req.body.body)
    // const newcomments=comments()
    
    try {
        // Find the project by ID and update it
        // let array=[...list]
        
        const updatedProject = await Project.findByIdAndUpdate(id, {
            comments:comments
            
            // Include any other fields you want to update
        })
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({
            message: 'Project updated successfully',
            project: updatedProject
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Error updating project', error: error.message });
    }
});
app.post('/myProjects/editproject/:id', async (req, res) => {
    const { id } = req.params; // Get the project ID from the request parameters

    try {
        const project = await Project.findById(id); // Fetch the project from the database by ID

        if (!project) {
            return res.status(404).json({ message: 'Project not found' }); // Handle case where project is not found
        }

        res.json(project); // Respond with the project details
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Error fetching project', error: error.message }); // Handle any errors
    }
});
app.post('/projectsuser', async (req, res) => {
    const {studentName} = req.body; // Get the project ID from the request parameters
    // console.log(studentName)
    try {
        const project = await Project.find({studentName:studentName}); // Fetch the project from the database by ID

        if (!project) {
            return res.status(404).json({ message: 'Project not found' }); // Handle case where project is not found
        }

        res.json(project); // Respond with the project details
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Error fetching project', error: error.message }); // Handle any errors
    }
});

//get user info--------------------------------------------------------------------------------------

// Import the User model
const User = require('./schema'); // Adjust the path if necessary

// Get all users endpoint
app.post('/user', async (req, res) => {

    const { collegeId, password}=req.body;
    console.log(req.body)
    try {
        const users = await User.findOne({ collegeId: collegeId });; // Fetch all users
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users); // Respond with the list of users
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});


app.post('/users', async (req, res) => {
    const { studentName, isProfessor, university, collegeId, password } = req.body.body;
    console.log(req.body.body)
    // Validate required fields
    if (!studentName || typeof isProfessor !== 'boolean' || !university || !collegeId || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser  = new User({
            studentName,
            isProfessor,
            university,
            collegeId,
            password: hashedPassword // Store the hashed password
        });

        // Save the user to the database
        await newUser .save();

        res.status(200).json({ message: 'User  created successfully', user: newUser  });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000) {
            // Handle duplicate key error (e.g., duplicate collegeId)
            return res.status(400).json({ message: 'College ID already exists' });
        }
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});