import React, { useState } from 'react';

const ProjectSearchAndFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');

  const universities = ['University A', 'University B', 'University C'];
  const tags = ['AI', 'Web Development', 'Mobile App', 'Data Science'];
  const domains = ['Education', 'Health', 'Finance', 'Entertainment'];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUniversityChange = (e) => {
    setSelectedUniversity(e.target.value);
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
  };

  const handleSearch = () => {
    // Implement the search logic here based on the current state
    console.log('Search:', { searchTerm, selectedUniversity, selectedTags, selectedDomain });
  };

  return (
    <>
     {/* <div className="bg-gray-200 w-1/5 p-4 rounded-md shadow-md"> */}
      <h2 className="text-lg font-bold mb-4">Browse Projects</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* University Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">University</label>
        <select
          value={selectedUniversity}
          onChange={handleUniversityChange}
          className="w-full px-3 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Universities</option>
          {universities.map((uni) => (
            <option key={uni} value={uni}>{uni}</option>
          ))}
        </select>
      </div>

      {/* Tags Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Project Tags</label>
        <div className="flex flex-col gap-2">
          {tags.map((tag) => (
            <label key={tag} className="inline-flex items-center">
              <input
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Domain Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Domain</label>
        <select
          value={selectedDomain}
          onChange={handleDomainChange}
          className="w-full px-3 text-black py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Domains</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    {/* </div> */}
    </>
  );
};

export default ProjectSearchAndFilter;