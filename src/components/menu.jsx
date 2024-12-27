import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import axios from 'axios';

const ProjectSearchAndFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRating, setSelectedRating] = useState(''); // State for selected rating
  const { projects, setProjects } = useContext(UserContext);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [p, setp] = useState([]);

  // const universities = ['University A', 'University B', 'University C'];
  const tags = ['Ai/Ml', 'Fullstack', 'Health-care', 'Educational', 'Deep Learning', 'Cloud', 'Electronics'];

  const ratings = [1, 2, 3, 4, 5]; // Rating options

  const universities = Array.from(new Set(projects.map(project => project.university)));
  // console.log(universities)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects'); // Ensure the URL is correct
        setp(response.data); // Set the projects data
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    // console.log(projects)
    fetchProjects(); // Call the fetch function
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUniversityChange = (e) => {
    setSelectedUniversity(e.target.value);
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((t) => t !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleSearch = () => {
    const filtered = p.filter((project) => {
      const matchesSearchTerm = project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.projectDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUniversity = selectedUniversity ? project.university === selectedUniversity : true;
      const matchesTags = selectedTags.length > 0 ? selectedTags.every(tag => project.tag.includes(tag)) : true;
      const matchesRating = selectedRating ? project.rating === parseInt(selectedRating) : true; // Check if project rating matches selected rating

      return matchesSearchTerm && matchesUniversity && matchesTags && matchesRating;
    });

    setFilteredProjects(filtered);
    // console.log('Filtered Projects:', filtered);
    setProjects(filtered);
  };
  const clearFilters = () => {
    setSearchTerm(''); // Reset search term
    setSelectedUniversity(''); // Reset selected university
    setSelectedTags([]); // Reset selected tags
    setSelectedRating(''); // Reset selected rating
    setFilteredProjects([]); // Optionally clear filtered projects
    setProjects(p);
  };
  return (
    <>
      <h2 className="text-lg font-bold mb-4 text-gray-200">Browse Projects</h2>

      {/* Search Bar */}
      <div className="mb-4 text-black">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-gray-200 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* University Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-200">University</label>
        <select
          value={selectedUniversity}
          onChange={handleUniversityChange}
          className="w-full bg-gray-200 px-3 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Universities</option>
          {universities.map((uni) => (
            <option key={uni} value={uni}>{uni}</option>
          ))}
        </select>
      </div>

      {/* Tag Filter */}
      <div className="mb-4">
        <h3 className="text-sm text-gray-200 font-medium mb-1">Tags</h3>
        <div className="flex flex-col">
          {tags.map((tag) => (
            <label key={tag} className="mr-4">
              <input
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="mr-2"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <label className="block text-gray-200 text-sm font-medium mb-1">Rating</label>
        <select
          value={selectedRating}
          onChange={handleRatingChange}
          className="w-full bg-gray-200 px-3 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Ratings</option>
          {ratings.map((rating) => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Search
      </button>
      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ml-2"
      >
        Clear Filters
      </button>
      {/* Display Filtered Projects */}
      {/* <div className="mt-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="border p-4 mb-4 rounded-md">
              <h3 className="font-bold">{project.projectTitle}</h3>
              <p>{project.projectDescription}</p>
              <p className="text-sm text-gray-500">University: {project.university}</p>
              <p className="text-sm text-gray-500">Rating: {project.rating}</p>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div> */}
    </>
  );
};

export default ProjectSearchAndFilter;