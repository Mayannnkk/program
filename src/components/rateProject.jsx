import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectDetail from './project'; // Import the ProjectDetails component
import { FaStar } from 'react-icons/fa'; // Import star icon for rating
import { useNavigate } from 'react-router-dom';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [ratings, setRatings] = useState({}); // To store ratings for each project
  const [feedbacks, setFeedbacks] = useState({}); // To store feedback for each project
    const navigate=useNavigate()
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects'); // Adjust the URL as necessary
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleClick = (postId) => {
    navigate(`/projects/${postId}`); // Navigate to the post detail page
};

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  const handleRatingChange = (projectId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [projectId]: rating,
    }));
  };

  const handleFeedbackChange = (projectId, feedback) => {
    setFeedbacks((prevFeedbacks) => ({
      ...prevFeedbacks,
      [projectId]: feedback,
    }));
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">All Projects</h2>
      {projects.length === 0 ? (
        <p className="text-gray-600">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="p-4 border rounded-lg shadow hover:shadow-md transition duration-200 bg-gray-100">
              <h3 className="text-xl font-semibold">{project.projectTitle}</h3>
              <p className="text-gray-700">{project.projectDescription}</p>
              <div className="flex items-center mt-2">
                <span className="mr-2">Rate:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${ratings[project.id] >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => handleRatingChange(project.id, star)}
                  />
                ))}
              </div>
              <textarea
                placeholder="Leave your feedback..."
                className="mt-2 w-full p-2 border rounded"
                rows="3"
                value={feedbacks[project._id] || ''}
                onChange={(e) => handleFeedbackChange(project.id, e.target.value)}
              />
              <button
                onClick={()=>handleClick(project._id)}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default ProjectsList;