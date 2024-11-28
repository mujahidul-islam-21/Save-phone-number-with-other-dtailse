import React, { useContext } from 'react';
import { AppContext } from '../context/Context';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCommentDots,
  FaEdit,
  FaDownload,
} from 'react-icons/fa';
import jsPDF from 'jspdf';

const UserDetails = () => {
  const { selectedUser, setEditingUser } = useContext(AppContext);

  if (!selectedUser) {
    return <div className="text-white">Select a user to see details</div>;
  }

  const handleEdit = () => {
    setEditingUser(selectedUser); // Set the selected user for editing
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('User Details', 20, 20);

    if (selectedUser.photo) {
      // Add photo to PDF
      const imgWidth = 40; // Adjust as needed
      const imgHeight = 40; // Maintain aspect ratio
      doc.addImage(selectedUser.photo, 'JPEG', 20, 30, imgWidth, imgHeight);
    }

    const userInfo = `
Name: ${selectedUser.name}
Username: ${selectedUser.username}
Email: ${selectedUser.email}
Phone: ${selectedUser.phone}
Address: ${selectedUser.address}
Comment: ${selectedUser.comment}
`;

    doc.text(userInfo, 20, 80); // Adjust Y coordinate based on photo
    doc.save(`${selectedUser.name}_Details.pdf`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <div className="relative bg-slate-900 p-4 rounded shadow text-white text-center">
        {/* Edit Icon */}
        <button
          onClick={handleEdit}
          className="absolute top-2 right-12 text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700"
          title="Edit User"
        >
          <FaEdit />
        </button>
        {/* Download Icon */}
        <button
          onClick={handleDownload}
          className="absolute top-2 right-2 text-white bg-green-600 p-2 rounded-full hover:bg-green-700"
          title="Download as PDF"
        >
          <FaDownload />
        </button>
        {selectedUser.photo && (
          <img
            src={selectedUser.photo}
            alt={`${selectedUser.name}'s photo`}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <div className="mb-4">
          <h3 className="text-2xl font-extrabold">{selectedUser.name}</h3>
          <p className="text-lg font-bold">{selectedUser.username}</p>
        </div>
        <div className="text-center space-y-3">
          <p className="flex items-center justify-center">
            <FaEnvelope className="mr-2 text-lg text-red-600" />
            <a
              href={`mailto:${selectedUser.email}`}
              className="no-underline hover:text-red-500"
            >
              {selectedUser.email}
            </a>
          </p>
          <p className="flex items-center justify-center">
            <FaPhone className="mr-2 text-lg text-green-500" />
            <a
              href={`tel:${selectedUser.phone}`}
              className="no-underline hover:text-green-600"
            >
              {selectedUser.phone}
            </a>
          </p>
          <p className="flex items-center justify-center">
            <FaMapMarkerAlt className="mr-2 text-lg text-blue-500" />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedUser.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:text-blue-400"
            >
              {selectedUser.address}
            </a>
          </p>
          <p className="flex items-center justify-center">
            <FaCommentDots className="mr-2 text-lg text-gray-300" />
            <span>{selectedUser.comment}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
