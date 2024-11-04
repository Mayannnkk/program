import axios from 'axios';
import React, { useState } from 'react';




const SubmitProjectForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    university: '',
    projectTitle: '',
    projectDescription: '',
    codeFile: null,
    imageFile: null,
  });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // For file inputs, store the file object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    dataToSubmit.append('codeFile', formData.codeFile);
    dataToSubmit.append('imageFile', formData.imageFile);
    dataToSubmit.append('studentName', formData.studentName);
    dataToSubmit.append('university', formData.university);
    dataToSubmit.append('projectTitle', formData.projectTitle);
    dataToSubmit.append('projectDescription', formData.projectDescription);

    try {
      // console.log(dataToSubmit)
      const response = await axios.post('http://localhost:5000/uploads', dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Project submitted successfully!');
        setFormData({
          studentName: '',
          university: '',
          projectTitle: '',
          projectDescription: '',
          codeFile: null,
          imageFile: null,
        });
      }
    } catch (error) {
      alert('Error submitting project: ' + error.message);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const codeFormData = new FormData();
  //   const imageFormData = new FormData();
  //   // for (const key in formData) {
  //   //   formDataToSubmit.append(key, formData[key]);
  //   // }
  //   codeFormData.append('codeFile', formData.codeFile);
  //   imageFormData.append('file', formData.imageFile);

  //   try {

      // const codeFileResponse = await axios({
      //   method: "post",
      //   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      //   data: codeFormData,
      //   headers: {
      //     pinata_api_key: "0a7a74e5bc22df15ebd4",
      //     pinata_secret_api_key: "541d0b3202be9dd36596f6d39331bc8e84d451555bfc7ba2ca0227cc421419cf",
      //     "Content-Type": "multipart/form-data"
      //   }
      // })
      // const codeFileUrl = "https://gateway.pinata.cloud/ipfs/" + codeFileResponse.data.IpfsHash
      // console.log(codeFileUrl)

      // const imageFileResponse=await axios({
      //   method:"post",
      //   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      //   data:imageFormData,
      //   headers:{
      //     pinata_api_key:"0a7a74e5bc22df15ebd4",
      //     pinata_secret_api_key:"541d0b3202be9dd36596f6d39331bc8e84d451555bfc7ba2ca0227cc421419cf",
      //     "Content-Type":"multipart/form-data"
      //   }
      // })
      // const imageFileUrl="https://gateway.pinata.cloud/ipfs/"+imageFileResponse.data.IpfsHash
      // console.log(imageFileUrl)

      


      // if (codeFileUrl) {
      //   console.log(formData)
      // }
      // console.log(formData)
      // console.log(formDataToSubmit)

      // const response = await fetch('/api/submit-project', {
      //   method: 'POST',
      //   body: formDataToSubmit,
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to submit the project');
      // }

      // Handle success (e.g., show a success message or redirect)
  //     alert('Project submitted successfully!');
  //     setFormData({
  //       studentName: '',
  //       university: '',
  //       projectTitle: '',
  //       projectDescription: '',
  //       codeFile: null,
  //       imageFile: null,
  //     });
  //   } catch (error) {
  //     // Handle error (e.g., show an error message)
  //     alert(error.message);
  //   }
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit Your Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            className="border p-2 w-full"
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
            className="border p-2 w-full"
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
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Project Description</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            required
            className="border p-2 w-full"
            rows="4"
          />
        </div>
        <div>
          <label className="block mb-1">Code File</label>
          <input
            type="file"
            name="codeFile"
            onChange={handleChange}
            accept=".zip,.rar,.tar,.gz,.js,.py,.java" // Acceptable file types
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Image File</label>
          <input
            type="file"
            name="imageFile"
            onChange={handleChange}
            accept="image/*" // Accepts any image file
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default SubmitProjectForm;