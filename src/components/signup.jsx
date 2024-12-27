import React, { useState,useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { UserContext } from '../context';

function SignupPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    university: '',
    email: '',
    password: '',
    confirmPassword: '',
    isProfessor: false, // Field to indicate if the user is a professor
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const{setCurrentUser,currentUser}=useContext(UserContext)

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Handle text input
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      isProfessor: checked // Update isProfessor based on checkbox state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.studentName || !formData.university || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Please fill in all fields');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const { studentName, email, password, isProfessor } = formData;

      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: studentName
      });

      // Make a POST request to the server to create a new user
      const response = await axios.post('http://localhost:5000/users', {
        body: {
          studentName: formData.studentName,
          university: formData.university,
          collegeId: formData.email, // Assuming you want to use email as college ID
          password: formData.password,
          isProfessor: formData.isProfessor // Include the boolean value for professor status
        }
      });
      console.log(formData)
      localStorage.setItem('currentUser', JSON.stringify({
        studentName: studentName,
        email: email,
        university: formData.university,
        isProfessor: isProfessor
      }));
  
      setCurrentUser (formData);

      if (response.status !== 200) {
        throw new Error('Failed to create user');
      }

      const data = await response.data;
      console.log('User  created:', data);
      navigate('/'); // Redirect after successful signup
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign up to create an account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Signup Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Student Name Field */}
            <div>
              <label htmlFor="student-name" className="sr-only">Student Name</label>
              <input
                id="student-name"
                name="studentName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline -none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
              />
            </div>

            {/* University Field */}
            <div>
              <label htmlFor="university" className="sr-only">University</label>
              <input
                id="university"
                name="university"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="University"
                value={formData.university}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Professor Checkbox */}
            <div>
              <input
                id="is-professor"
                name="isProfessor"
                type="checkbox"
                className="mr-2"
                checked={formData.isProfessor}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="is-professor" className="text-sm text-gray-600">I am a professor</label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Loading...' : 'Sign up'}
          </button>
        </form>

        {/* Already have an account? */}
        <div className="text-center">
          <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;