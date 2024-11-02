import React, { useEffect, useState } from 'react';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulating a fetch call to get projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Replace this with your API call
        const response = await fetch('/api/projects'); // Example API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Submitted Projects</h1>
      {projects.length === 0 ? (
        <p>No projects submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p>{project.description}</p>
              <p className="text-gray-500">Submitted on: {new Date(project.submittedDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProjects;