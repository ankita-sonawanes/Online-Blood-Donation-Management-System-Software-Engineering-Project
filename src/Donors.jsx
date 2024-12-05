//Donors.jsx
import React, { useState, useEffect } from 'react'; 
import './Donors.css';

const Donors = () => {
  const [donorName, setDonorName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [contact, setContact] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedDonorId, setSelectedDonorId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const donorData = {
      name: donorName,
      age,
      gender,
      blood_type: bloodType,
      contact_info: contact,
    };

    const method = selectedDonorId ? 'PUT' : 'POST';
    const url = selectedDonorId
      ? `http://localhost:3014/api/donors/${selectedDonorId}`
      : 'http://localhost:3014/api/donors';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donorData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save donor data');
        }
        return response.json();
      })
      .then(() => {
        alert(`Donor ${selectedDonorId ? 'updated' : 'registered'} successfully!`);
        resetForm();
      })
      .catch(() => {
        setErrorMessage('Failed to save the donor. Please try again.');
      });
  };

  const resetForm = () => {
    setDonorName('');
    setAge('');
    setGender('');
    setBloodType('');
    setContact('');
    setSelectedDonorId(null);
  };

  return (
    <div className="donor-registration">
      <form className="container" onSubmit={handleSubmit}>
        <div className="donors">
          <h1>{selectedDonorId ? 'Update Donor' : 'Donor Registration Form'}</h1>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className="form-wrapper">
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
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="age">Age:</label></td>
                <td>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label>Gender:</label></td>
                <td>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === 'Male'}
                    required
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === 'Female'}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="Other"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === 'Other'}
                  />
                  <label htmlFor="other">Other</label>
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
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  <button type="submit">{selectedDonorId ? 'Update Donor' : 'Register Donor'}</button>
                  <button type="button" onClick={resetForm}>Reset</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default Donors;
