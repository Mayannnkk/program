import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser,setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/users'); // Adjust the URL if necessary
  //       setUsers(response.data); // Set the users state with the response data
  //     } catch (err) {
  //       setError(err.message); // Set the error message if the request fails
  //     } finally {
  //       setLoading(false); // Set loading to false once the request is complete
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  // console.log(users[0])

  const userInfo = {
    name: 'John Doe',
    university: 'University A',
    submissions: ['Project 1', 'Project 2', 'Project 3'],
    savedItems: ['Item 1', 'Item 2'],
  };

  // useEffect(() => {
  //   const storedUser  = JSON.parse(localStorage.getItem('currentUser '));
  //   setCurrentUser (storedUser );
  // }, []);

  console.log(currentUser)
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('currentUser');

    // Update the context state to null or reset it
    navigate('/login');
    setCurrentUser (null);
  };
  return (
    <>
    {currentUser && 
    <div className="bg-white shadow-md rounded-md p-4">
    <h2 className="text-lg font-bold mb-4">Profile</h2>
    <div className="mb-4">
      <p className="font-semibold">Name: <span className="font-normal">{currentUser.studentName}</span></p>
      <p className="font-semibold">University: <span className="font-normal">{currentUser.university}</span></p>
    </div>

    <div className="mb-4">
      <h3 className="font-semibold">My Submissions:</h3>
      <ul className="list-disc list-inside">
        {userInfo.submissions.map((submission, index) => (
          <li key={index}>{submission}</li>
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