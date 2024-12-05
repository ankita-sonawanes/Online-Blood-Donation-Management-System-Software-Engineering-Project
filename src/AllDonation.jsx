//AllDonation.jsx
import React, { useState, useEffect } from 'react';
import './AllDonation.css';

const AllDonation = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Fetch all donors from the backend
    fetch('http://localhost:3014/api/donors') // Replace with your correct backend URL
      .then((response) => response.json())
      .then((data) => {
        setDonors(data);
      })
      .catch((error) => {
        console.error('Error fetching donors:', error);
      });
  }, []);

  const handleDelete = (donorId) => {
    // Delete donor by ID
    fetch(`http://localhost:3014/api/donors/${donorId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete donor');
        }
        // Remove the deleted donor from the list
        setDonors(donors.filter((donor) => donor.id !== donorId));
        alert('Donor deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting donor:', error);
        alert('Failed to delete the donor.');
      });
  };

  const handleEdit = (donorId) => {
    // Redirect to Donors.js page with selected donor data to edit
    const donorToEdit = donors.find((donor) => donor.id === donorId);
    if (donorToEdit) {
      sessionStorage.setItem('donorToEdit', JSON.stringify(donorToEdit));
      window.location.href = '/donors'; // Replace with your preferred navigation method
    }
  };

  return (
    <div className="all-donors-container">
      <h1 style={{ color: 'green' }}>All Donors List</h1>
      <table className="donors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Blood Type</th>
            <th>Contact Information</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.length > 0 ? (
            donors.map((donor, index) => (
              <tr key={donor.id} style={{ backgroundColor: index % 2 === 0 ? '#f9c2d7' : 'white' }}>
                <td>{donor.name}</td>
                <td>{donor.age}</td>
                <td>{donor.gender}</td>
                <td>{donor.blood_type}</td>
                <td>{donor.contact_info}</td>
                <td>
                  <button
                    onClick={() => handleEdit(donor.id)}
                    style={{
                      backgroundColor: 'yellow',
                      color: 'black',
                      marginRight: '5px',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px 10px',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(donor.id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px 10px',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No donors registered yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllDonation;
