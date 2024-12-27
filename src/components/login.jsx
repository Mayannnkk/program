import React, { useState, useEffect ,useContext} from 'react';
import { FaGoogle, FaFacebook, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from 'axios';
import { UserContext } from '../context';

function LoginPage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const{setCurrentUser,currentUser}=useContext(UserContext)
  let navigate = useNavigate();



  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const response =await axios.post('http://localhost:5000/user', {
        
          collegeId: email, // Assuming you want to use email as college ID
          password: password,
          
      });
      console.log(response.data)
      setCurrentUser(response.data)

      localStorage.setItem('currentUser', JSON.stringify({
        studentName: response.data.studentName,
        collegeId: response.data.collegeId,
        university: response.data.university,
        isProfessor: response.data.isProfessor
      }));
      // console.log(currentUser)
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    console.log(`Logging in with ${platform}`);
    // Implement social login logic here
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Field */}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            
            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {showPassword ? (
                  <FaEyeSlash
                    className="text-gray-400 hover:text-gray-500 transition duration-300 ease-in-out"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="text-gray-400 hover:text-gray-500 transition duration-300 ease-in-out"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Loading...' : 'Sign in'}
          </button>

          {/* Social Login Buttons */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => handleSocialLogin('Google')}
            >
              <FaGoogle className="mr-2" />
              Google
            </button>
            <button
              type="button"
              className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <FaFacebook className="mr-2" />
              Facebook
            </button>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => handleSocialLogin('GitHub')}
            >
              <FaGithub className="mr-2" />
              GitHub
            </button>
          </div>

          {/* Register Link */}
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
          </p>
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
}

export default LoginPage;