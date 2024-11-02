import React from 'react';

const Profile = () => {
  const userInfo = {
    name: 'John Doe',
    university: 'University A',
    submissions: ['Project 1', 'Project 2', 'Project 3'],
    savedItems: ['Item 1', 'Item 2'],
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <p className="font-semibold">Name: <span className="font-normal">{userInfo.name}</span></p>
        <p className="font-semibold">University: <span className="font-normal">{userInfo.university}</span></p>
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
    </div>
  );
};

export default Profile;