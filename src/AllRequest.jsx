//AllRequest.jsx
import React, { useState, useEffect } from 'react';
import './AllRequest.css'; // Ensure you have a CSS file for styling

const AllRequest = () => {
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    patient_name: '',
    blood_type: '',
    contact_info: '',
    request_date: ''
  });

  useEffect(() => {
    // Fetch all blood requests from the backend
    fetch('http://localhost:3014/api/requests') // Replace with your correct backend URL
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => {
        console.error('Error fetching requests:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      fetch(`http://localhost:3014/api/requests/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete the request.');
          }
          setRequests(requests.filter((request) => request.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting request:', error);
        });
    }
  };

  const handleEdit = (request) => {
    setEditingId(request.id);
    setEditFormData({
      patient_name: request.patient_name,
      blood_type: request.blood_type,
      contact_info: request.contact_info,
      request_date: request.request_date,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3014/api/requests/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update the request.');
        }
        // Update the list with edited data
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === editingId ? { ...req, ...editFormData } : req
          )
        );
        setEditingId(null);
      })
      .catch((error) => {
        console.error('Error updating request:', error);
      });
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="all-requests-container">
      <h1 style={{ color: 'green' }}>All Blood Requests List</h1>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Type</th>
            <th>Contact Information</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <tr key={request.id} style={{ backgroundColor: index % 2 === 0 ? '#f9c2d7' : 'white' }}>
                <td>{request.patient_name}</td>
                <td>{request.blood_type}</td>
                <td>{request.contact_info}</td>
                <td>{request.request_date}</td>
                <td>
                  <button
                    className="edit-button"
                    style={{ backgroundColor: 'yellow', marginRight: '10px' }}
                    onClick={() => handleEdit(request)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleDelete(request.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No blood requests found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingId && (
        <div className="edit-form">
          <h2>Edit Blood Request</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="patient_name">Name:</label>
              <input
                type="text"
                id="patient_name"
                name="patient_name"
                value={editFormData.patient_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="blood_type">Blood Type:</label>
              <select
                id="blood_type"
                name="blood_type"
                value={editFormData.blood_type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact_info">Contact Information:</label>
              <input
                type="text"
                id="contact_info"
                name="contact_info"
                value={editFormData.contact_info}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="request_date">Date of Birth:</label>
              <input
                type="date"
                id="request_date"
                name="request_date"
                value={editFormData.request_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Update Request</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllRequest;
