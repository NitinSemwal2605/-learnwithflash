import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import the Link component

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/dashboard');
  };

  const handleLogoClick = () => {
    window.location.reload(); // Reloads the page
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-yellow-500 text-lg font-bold">
          <Link
            to="/" 
            onClick={handleLogoClick} // Add click handler to logo
            className="hover:text-yellow-300"
          >
            FlashLearn
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="bg-yellow-500 text-black p-2 rounded hover:bg-yellow-700 transition duration-300"
          >
            Admin Dashboard
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-yellow-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
