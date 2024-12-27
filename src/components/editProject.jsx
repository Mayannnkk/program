// src/EditProject.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditProject() {
  const { id } = useParams(); // Get the project ID from the URL
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // Add other fields as necessary
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/myProjects/editproject/${id}`); // Replace with your API endpoint
        console.log(response.data)
        
        const data = await response.data;
        setProject(data);
        setFormData({
          title: data.projectTitle,
          description: data.projectDescription,
          // Initialize other fields as necessary
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/projects/${id}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
            projectTitle:formData.title,
            projectDescription:formData.description
        },
      });

      if (response.status==404) {
        throw new Error('Failed to update project');
      }

      // Optionally navigate back or show a success message
      navigate('/myProjects'); // Redirect to the projects page
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Add other fields as necessary */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Project
        </button>
      </form>
    </div>
  );
}

export default EditProject;