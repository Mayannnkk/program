import React, { useState } from 'react';

function SignupPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    university: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
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

        // Make a POST request to the server to create a new user
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentName: formData.studentName,
                university: formData.university,
                collegeId: formData.email, // Assuming you want to use email as college ID
                password: formData.password,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const data = await response.json();
        console.log('User  created:', data);
        // Optionally redirect or show a success message

    } catch (err) {
        setError(err.message || 'An error occurred during signup');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="University"
                value={formData.university}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">College Email ID</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="College Email ID"
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
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Loading...' : 'Sign up'}
          </button>

          {/* Login Option */}
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-900">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;