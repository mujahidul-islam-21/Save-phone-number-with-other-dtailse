import React from 'react';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import { ContextProvider } from './context/Context';

const App = () => {
  return (
    <ContextProvider>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 p-2 md:p-4 bg-gray-900 min-h-screen">
        {/* Create User Form */}
        <div className="bg-gray-800 p-4 rounded-lg text-white">
          <CreateUser />
        </div>
        {/* User List */}
        <div className="bg-slate-600 p-4 rounded-lg overflow-y-auto">
          <UserList />
        </div>
        {/* User Details */}
        <div className="bg-gray-800 p-4 rounded-lg text-white">
          <UserDetails />
        </div>
      </div>
    </ContextProvider>
  );
};

export default App;
