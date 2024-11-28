import React, { createContext, useState, useEffect } from 'react';

// Create AppContext
export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  // Load users from localStorage or initialize an empty array
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [selectedUser, setSelectedUser] = useState(null); // Currently selected user
  const [editingUser, setEditingUser] = useState(null); // User being edited

  // Sync users to localStorage whenever the users array changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  // Add a new user
  const addUser = user => {
    setUsers(prev => [...prev, user]);
  };

  // Edit an existing user
  const editUser = updatedUser => {
    setUsers(prev =>
      prev.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null); // Clear edit mode after update
  };

  // Delete a user
  const deleteUser = id => {
    setUsers(prev => prev.filter(user => user.id !== id));
    if (selectedUser?.id === id) {
      setSelectedUser(null); // Reset selected user if deleted
    }
  };

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        editingUser,
        setEditingUser,
        addUser,
        editUser,
        deleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
