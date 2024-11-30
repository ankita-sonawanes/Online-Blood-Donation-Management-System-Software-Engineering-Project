//login.js

const express = require('express');
const router = express.Router();
const db = require('./dbConnection');

// POST: Login API
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const user = results[0];

        if (user.password === password) {
            return res.status(200).json({ message: 'Login successful.' });
        } else {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
    });
});

// GET: Fetch all users (for admin or debugging)
router.get('/users', (req, res) => {
    const query = 'SELECT user_id, username FROM users'; // Avoid sending sensitive data like passwords
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json(results);
    });
});

module.exports = router;

