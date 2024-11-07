import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ error }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-2xl text-gray-600 mb-8">
          {error?.message || 'The page you are looking for does not exist. It might have been moved or deleted.'}
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;