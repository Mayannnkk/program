import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser,setCurrentUser] = useState();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState([]);

  const userInfo = {
    name: 'John Doe',
    university: 'University A',
    submissions: ['Project 1', 'Project 2', 'Project 3'],
    savedItems: ['Item 1', 'Item 2'],
  };

  useEffect(() => {
    const storedUser  = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser (storedUser);
  }, []);

  // console.log(currentUser)
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('currentUser');

    // Update the context state to null or reset it
    navigate('/login');
    setCurrentUser (null);
  };

  useEffect(() => {
    const fetchUserProjects = async () => {
      if (!currentUser  || !currentUser.studentName) {
        setError('No user found.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`http://localhost:5000/projectsuser`,currentUser); // Adjust the URL as necessary
        console.log(response.data)
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, [currentUser]);
  // console.log(currentUser)
  return (
    <>
    {currentUser && 
    <div className=" text-white m-2 bg-gradient-to-t p-10 from-gray-800 to-gray-700 shadow-md rounded-md p-4">
    <h2 className="text-lg font-bold mb-4">Profile</h2>
    <div className="mb-4">
      <p className="font-semibold text-gray-400">Name: <span className="font-normal text-white">{currentUser.studentName}</span></p>
      <p className="font-semibold text-gray-400">University: <span className="font-normal text-white">{currentUser.university}</span></p>
      <p className="font-semibold text-gray-400">Role: <span className="font-normal text-white">{currentUser.isProfessor?"Professor":"Student"}</span></p>
    </div>

    <div className="mb-4">
      <h3 className="font-semibold">My Submissions:</h3>
      <ul className="list-disc list-inside">
        {projects.map((project) => (
          <li key={project._id}>{project.projectTitle}</li>
        ))}
      </ul>
    </div>

    <div className="mb-4">
      <h3 className="font-semibold">Saved Items:</h3>
      <ul className="list-disc list-inside">
        {userInfo.savedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
      Edit Personal Info
    </button>
    <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Logout
          </button>
  </div>
    }
    </>
    
  );
};

export default Profile;