import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to the backend
      const response = await axios.post('http://localhost:3014/api/auth/login', { username, password });
      console.log(response.data);

      if (response.data.message === 'Login successful.') {
        setIsLoggedIn(true); // Set login state to true
        setError('');
      } else {
        setError(response.data.message); // Display backend message in case of invalid credentials
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Login failed. Please try again.');
    }
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="admin-container">
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="admin-login-form">
          <table className="login-table">
            <tbody>
              <tr>
                <td><label htmlFor="username">Username:</label></td>
                <td>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="password">Password:</label></td>
                <td>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type="submit" className="login-button">Login</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      ) : (
        <div className="button-container">
          <button
            type="button"
            className="nav-button"
            onClick={() => handleNavigation('/all-donation')}
          >
            AllDonation
          </button>
          <button
            type="button"
            className="nav-button"
            onClick={() => handleNavigation('/all-request')}
          >
            AllRequest
          </button>
        </div>
      )}

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Admin;
