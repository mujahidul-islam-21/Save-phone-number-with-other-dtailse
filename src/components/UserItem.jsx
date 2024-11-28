import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const UserItem = ({ user }) => {
  return (
    <div className="w-6/12 text-center">
      <div className="p-2">
        <div className="border p-2 bg-red-200 rounded-lg border-collapse">
          {/* Display Photo */}
          {user.photo && (
            <img
              src={user.photo}
              alt={`${user.name}'s avatar`}
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
            />
          )}
          <p className="text-2xl font-semibold">{user.name}</p>
          <p>{user.username}</p>

          {/* Replaced email with call and email icons */}
          <div className="flex justify-center space-x-4 mt-3">
            {/* Phone Icon */}
            <a
              href={`tel:${user.phone}`}
              className="text-green-500 hover:text-green-700"
            >
              <FaPhone size={24} />
            </a>

            {/* Email Icon */}
            <a
              href={`mailto:${user.email}`}
              className="text-red-500 hover:text-red-700"
            >
              <FaEnvelope size={24} />
            </a>
          </div>

          <button className="px-3 py-1 bg-sky-600 text-white rounded mt-3">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
