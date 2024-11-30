//Donors.js
const express = require('express'); // Only declare once at the top 
const router = express.Router();
const db = require('./dbConnection');

// Add a new donor with validation for missing fields
router.post('/', (req, res) => {
    const { name, age, gender, blood_type, contact_info } = req.body;

    // Validate that all fields are present
    if (!name || !age || !gender || !blood_type || !contact_info) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO Donors (name, age, gender, blood_type, contact_info) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, age, gender, blood_type, contact_info], (err, result) => {
        if (err) {
            console.error('Error inserting donor into database:', err);
            return res.status(500).json({ error: 'Failed to register donor' });
        }
        // Send success response
        res.status(200).json({ message: 'Donor registered successfully', donorId: result.insertId });
    });
});

// Get all donors
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Donors';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching donors from database:', err);
            return res.status(500).json({ error: 'Failed to retrieve donors' });
        }
        res.json(results);
    });
});

// Search donors by name
router.get('/search', (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Name is required for search' });
    }

    const sql = 'SELECT * FROM Donors WHERE name LIKE ?';
    db.query(sql, [`%${name}%`], (err, results) => {
        if (err) {
            console.error('Error searching donors:', err);
            return res.status(500).json({ error: 'Failed to search donors' });
        }
        res.json(results);
    });
});

// Update donor by ID
// Update a donor by donor_id
router.put('/:id', (req, res) => {
    const donorId = req.params.id;
    const { name, age, gender, blood_type, contact_info } = req.body;

    // Validate that at least one field is being updated
    if (!name && !age && !gender && !blood_type && !contact_info) {
        return res.status(400).json({ error: 'At least one field is required to update' });
    }

    let sql = 'UPDATE Donors SET';
    let params = [];
    
    // Dynamically construct the query based on the fields provided in the request body
    if (name) {
        sql += ' name = ?,';
        params.push(name);
    }
    if (age) {
        sql += ' age = ?,';
        params.push(age);
    }
    if (gender) {
        sql += ' gender = ?,';
        params.push(gender);
    }
    if (blood_type) {
        sql += ' blood_type = ?,';
        params.push(blood_type);
    }
    if (contact_info) {
        sql += ' contact_info = ?,';
        params.push(contact_info);
    }

    // Remove the last comma and add the WHERE clause
    sql = sql.slice(0, -1) + ' WHERE donor_id = ?';
    params.push(donorId);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating donor in database:', err);
            return res.status(500).json({ error: 'Failed to update donor' });
        }
        res.json({ message: 'Donor updated successfully' });
    });
});

// Delete a donor by ID
router.delete('/:id', (req, res) => {
    const donorId = req.params.id;
    const sql = 'DELETE FROM Donors WHERE donor_id = ?';  // Use the correct column name

    db.query(sql, [donorId], (err, result) => {
        if (err) {
            console.error('Error deleting donor from database:', err);
            return res.status(500).json({ error: 'Failed to delete donor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }
        res.status(200).json({ message: 'Donor deleted successfully' });
    });
});

module.exports = router;
