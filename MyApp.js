//MyApp.js
const express = require('express');  // Declare express only once
const bodyParser = require('body-parser');
const donorsRoutes = require('./Donors');
const donationsRoutes = require('./Donations');
const requestsRoutes = require('./Requests');
const loginRoutes = require('./login'); // Import the login route


const cors = require('cors');

const app = express();  // Initialize app here
const PORT = 3014;  // Your backend port

app.use(cors());  // Use cors after initializing app
app.use(bodyParser.json());

// Routes
app.use('/api/donors', donorsRoutes);
app.use('/api/donations', donationsRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/auth', loginRoutes); // Use the login route

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
