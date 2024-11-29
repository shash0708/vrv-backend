import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../Config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await axios.post(`${URL}/api/login`, data, {
        withCredentials: true,
      });
      const { role } = response.data;
     localStorage.setItem('role', role);
      navigate('/Table');

      console.log('Login successful:', response.data,role);
      // Handle successful login (e.g., store JWT in localStorage)
      // Redirect to dashboard or another page
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p
        className="text-sm text-indigo-600 cursor-pointer hover:underline"
        onClick={() => navigate('/signup')} // Navigate to the signup page
      >
        Did Register? Sign Up Here
      </p>
      </div>
      
    </div>
  );
};

export default Login;
