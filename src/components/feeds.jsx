import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaComment, FaSave } from 'react-icons/fa'; // Importing icons from react-icons
import { UserContext } from '../context';

function Feeds() {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    // const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const {projects,setProjects}=useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/projects'); // Ensure the URL is correct
                setProjects(response.data); // Set the projects data
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };
        // console.log(projects)
        fetchProjects(); // Call the fetch function
    }, []);

    if (loading) {
        return <div className="text-center text-lg text-gray-500">Loading projects...</div>; // Loading state
    }

    const handleClick = (postId) => {
        navigate(`/projects/${postId}`); // Navigate to the post detail page
    };

    return (
        <div className="flex flex-col m-6 gap-4">
            {projects.map((project) => (
                <div
                    key={project._id}
                    className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                    onClick={() => handleClick(project._id)} // Pass project ID to handleClick
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0)), url(${project.imageFile})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '400px',
                        
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for better text visibility */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-bold">{project.projectTitle}</h3>
                        <p className="description-text line-clamp-3">{project.projectDescription}</p>
                        <div className="flex justify-between mt-4 relative">
                            <div className="bg-black flex-row gap-4 flex bg-opacity-50 rounded-md p-2"> {/* Gradient background for icons */}
                                <button className="flex items-center text-red-400 hover:text-red-600">
                                    <FaHeart className="mr-1" /> {project.likes || 0}
                                </button>
                                <button className="flex items-center text-blue-400 hover:text-blue-600">
                                    <FaComment className="mr-1" /> {project.comments.length || 0}
                                </button>
                                <button className="flex items-center text-blue-400 hover:text-blue-600">
                                    <FaSave className="mr-1" /> Save
                                </button>
                            </div>
                        </div>
                        </div>
                </div>
            ))}
        </div>
    );
}

export default Feeds;