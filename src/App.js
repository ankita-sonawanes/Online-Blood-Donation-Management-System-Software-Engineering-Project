import React from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Donors from './Donors';
import Requests from './Requests';
import Admin from './Admin';
import AllDonation from './AllDonation'; // Import AllDonation component
import AllRequest from './AllRequest'; // Import AllRequest component

import './App.css'; // Ensure you import your CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/donors">Donors</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/all-donation" element={<AllDonation />} /> {/* Define the route for All Donation */}
            <Route path="/all-request" element={<AllRequest />} /> {/* Define the route for AllRequest */}

          </Routes>
        </main>

        {/* Conditionally render the footer only on the Home page */}
        <Routes>
          <Route
            path="/"
            element={
              <footer className="footer">
                <h2>Footer Title</h2>
                <p>Footer content goes here.</p>
              </footer>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
