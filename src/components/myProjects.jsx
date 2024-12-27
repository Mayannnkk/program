// src/MyProjects.js

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaComment, FaSave } from 'react-icons/fa'; // Importing icons from react-icons
import Navbar from './Navbar';
import { FaEdit } from 'react-icons/fa'; // Importing edit icon



function MyProjects() {
//   const {projects, setProjects} = useContext(UserContext);
  const [myprojects, setmyProjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/projects'); // Ensure the URL is correct
            // console.log(response.data); // Set the projects data
            const currentuser=JSON.parse(localStorage.getItem('currentUser'))
            // console.log(currentuser)
            const newlist=response.data.filter(item=>item.studentName===currentuser.studentName)
            setmyProjects(newlist)
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            // setLoading(false); // Set loading to false after fetch
        }
    };
    // console.log(projects)
    fetchProjects(); // Call the fetch function
}, []);
const handleClick = (postId) => {
    navigate(`/projects/${postId}`); // Navigate to the post detail page
};
const handleEdit = (projectid) => {
    navigate(`editproject/${projectid}`); // Navigate to the post detail page
};
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Projects</h1>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myprojects.length > 0 ? (
              myprojects.map(project => (
                <div
                    key={project._id}
                    className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                    // onClick={() => handleClick(project._id)} // Pass project ID to handleClick
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0)), url(${project.imageFile})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '400px',
                        
                    }}
                >
                  <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for better text visibility */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 onClick={() => handleClick(project._id)} className="text-lg font-bold">{project.projectTitle}</h3>
                        {/* <p className="description-text line-clamp-3">{project.projectDescription}</p> */}
                        <div className="flex justify-between mt-4 relative">
                            <div className="bg-black flex-row gap-4 flex bg-opacity-50 rounded-md p-2"> {/* Gradient background for icons */}
                                <button  className="flex items-center text-red-400 hover:text-red-600" onClick={()=>handleEdit(project._id)}>
                                    <FaEdit className="mr-1" /> {"Edit"}
                                </button>
                                
                            </div>
                        </div>
                        </div>
                
                </div>
              ))
            ) : (
              <p className="text-gray-500">No projects found for this student.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProjects;