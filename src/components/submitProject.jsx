import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    university: '',
    projectTitle: '',
    projectDescription: '',
    codeFile: null,
    imageFile: null,
    projectCategory: '',
    tag: '', // Added tags to state
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // For file inputs, store the file object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image file to Pinata
      const imageFileResponse = await uploadToPinata(formData.imageFile);
      const imageFileUrl = `https://gateway.pinata.cloud/ipfs/${imageFileResponse.data.IpfsHash}`;

      // Prepare data to submit
      const dataToSubmit = {
        studentName: formData.studentName,
        university: formData.university,
        projectTitle: formData.projectTitle,
        projectDescription: formData.projectDescription,
        codeFile: null, // Set codeFile to null
        imageFile: imageFileUrl, // Use the URL from Pinata
        projectCategory: formData.projectCategory, // Include projectCategory
        tag: formData.tag // Split tags into an array
      };

      // Send data to the server
      const response = await axios.post('http://localhost:5000/uploadproject', dataToSubmit);
      console.log(dataToSubmit);
      if (response.status === 200) {
        alert('Project submitted successfully!');
        setFormData({
          studentName: '',
          university: '',
          projectTitle: '',
          projectDescription: '',
          codeFile: null,
          imageFile: null,
          projectCategory: '', // Reset projectCategory
          tags: '', // Reset tags
        });
        navigate('/');
      }
    } catch (error) {
      alert('Error submitting project: ' + error.message);
    }
  };

  const uploadToPinata = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        pinata_api_key: '0a7a74e5bc22df15ebd4',
        pinata_secret_api_key: '541d0b3202be9dd36596f6d39331bc8e84d451555bfc7ba2ca0227cc421419cf',
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <>
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Submit Your Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">University</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Project Title</label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Project Description</label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <div>
            <label className="block mb-1">Code File</label>
            <input
              type="file"
              name="codeFile"
              onChange={handleChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Image File</label>
            <input
              type="file"
              name="imageFile"
              onChange={handleChange}
              required
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Project Category</label>
            <div className="space-y-2">
              {['Ai/Ml', 'Fullstack', 'Health-care', 'Educational', 'Deep Learning', 'Cloud', 'Electronics'].map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="projectCategory"
                    value={category}
                    onChange={handleChange}
                    required
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
            Submit Project
          </button>
        </form>
      </div>
    </div>
    <style jsx>{`
  body {
    background: linear-gradient(to right, #2d3748, #1a202c); /* This corresponds to from-gray-800 to gray-900 */
  }
`}</style>
    </>
  );
};

export default SubmitProjectForm;