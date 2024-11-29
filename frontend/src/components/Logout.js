import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role'); // Remove user role
    navigate('/login'); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
