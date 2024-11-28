import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/Context';

const CreateUser = () => {
  const { addUser, editUser, editingUser, setEditingUser } =
    useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
    photo: '', // Add photo field
  });

  // Prefill form if editingUser is set
  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, photo: reader.result }); // Save photo as base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingUser) {
      editUser({ ...formData });
    } else {
      addUser({ ...formData, id: Date.now() });
    }
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
      photo: '', // Reset photo
    });
    setEditingUser(null); // Exit editing mode
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {editingUser ? 'Edit User' : 'Create a New User'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'username', 'email', 'phone', 'address', 'comment'].map(
          field => (
            <div key={field}>
              <label className="block capitalize">{field}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded text-black"
              />
            </div>
          )
        )}
        <div>
          <label className="block">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full p-2 border border-gray-400 rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
        >
          {editingUser ? 'Update User' : 'Save User'}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
