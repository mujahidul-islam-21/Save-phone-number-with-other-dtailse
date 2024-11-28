import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Context';

const UserList = () => {
  const { users, setSelectedUser, deleteUser } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on the search query
  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">All Users</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, phone, or email..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full p-2 text-black rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
        {/* Show filtered users */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-pink-200 p-4 rounded shadow text-center text-white flex flex-col sm:text-xs xl:text-2xl 2xl:text-2xl"
            >
              {user.photo && (
                <img
                  src={user.photo}
                  alt={`${user.name}'s photo`}
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
              )}
              <h3 className="font-bold text-black">{user.name}</h3>
              <p className="text-gray-600 font-medium">{user.username}</p>
              <p className="text-red-500">{user.email}</p>
              <div className="flex justify-center space-x-2 mt-2">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="bg-green-700 text-white px-4 py-1 rounded"
                >
                  Show Details
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
