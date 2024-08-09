import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-200px)]">
      <div className="flex flex-col items-center bg-red-50 p-8 rounded-lg shadow-lg">
        <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-700 mb-2">Error Occurred</h2>
        <p className="text-red-600 text-center mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
