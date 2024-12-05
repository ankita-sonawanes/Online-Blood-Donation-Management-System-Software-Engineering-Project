import React, { useState } from 'react';
import './Requests.css';

const Requests = () => {
  const [requesterName, setRequesterName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [contact, setContact] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const requestData = {
      patient_name: requesterName,
      blood_type: bloodType,
      contact_info: contact,
      request_date: dob,
    };

    const method = selectedRequestId ? 'PUT' : 'POST';
    const url = selectedRequestId
      ? `http://localhost:3014/api/requests/${selectedRequestId}`
      : 'http://localhost:3014/api/requests';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to register the blood request.');
        }
        return response.json();
      })
      .then(() => {
        alert(`Blood request ${selectedRequestId ? 'updated' : 'registered'} successfully!`);
        resetForm();
      })   
      .catch(() => {
        setErrorMessage('Failed to register the request. Please try again.');
      });
  };

  const resetForm = () => {
    setRequesterName('');
    setBloodType('');
    setContact('');
    setDob('');
    setSelectedRequestId(null);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="requests">
            <h1>{selectedRequestId ? 'Update Blood Request' : 'Blood Request Form'}</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </div>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="name">Name:</label></td>
                <td>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your Name"
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="bloodtype">Blood Type:</label></td>
                <td>
                  <select
                    id="bloodtype"
                    name="bloodtype"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
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
                </td>
              </tr>
              <tr>
                <td><label htmlFor="contact">Contact Information:</label></td>
                <td>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="Enter your Contact Information"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="dob">Date of Birth:</label></td>
                <td>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  <button type="submit">{selectedRequestId ? 'Update Request' : 'Register'}</button>
                  <button type="button" onClick={resetForm}>Reset</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default Requests;
