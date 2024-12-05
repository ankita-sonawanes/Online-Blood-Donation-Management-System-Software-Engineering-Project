import React, { useEffect, useState } from 'react';

const Donors = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      const response = await fetch('http://localhost:3014/api/donors');
      const data = await response.json();
      setDonors(data);
    };
    fetchDonors();
  }, []);

  return (
    <div>
      <h2>Donors List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Type</th>
            <th>Contact Information</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor.id}>
              <td>{donor.name}</td>
              <td>{donor.bloodType}</td>
              <td>{donor.contactInfo}</td>
              {/* Add other data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donors;
