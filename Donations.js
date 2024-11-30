// Donations.js
const express = require('express');
const router = express.Router();
const db = require('./dbConnection');

// Get all donations
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Donations';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new donation
router.post('/', (req, res) => {
    const { donor_id, donation_date, blood_type } = req.body;
    const sql = 'INSERT INTO Donations (donor_id, donation_date, blood_type) VALUES (?, ?, ?)';

    db.query(sql, [donor_id, donation_date, blood_type], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Donation added successfully', donationId: result.insertId });
    });
});

module.exports = router;
