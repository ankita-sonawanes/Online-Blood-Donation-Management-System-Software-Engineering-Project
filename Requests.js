const express = require('express');
const router = express.Router();
const db = require('./dbConnection');

// Add a new donor with validation for missing fields
router.post('/', (req, res) => {
    const { patient_name, blood_type, contact_info, request_date } = req.body;

    // Validate that all fields are present
    if (!patient_name || !blood_type || !contact_info || !request_date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO Requests (patient_name, blood_type, contact_info, request_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [patient_name, blood_type, contact_info, request_date], (err, result) => {
        if (err) {
            console.error('Error inserting request into database:', err);
            return res.status(500).json({ error: 'Failed to register request' });
        }
        res.status(200).json({ message: 'Request registered successfully', requestId: result.insertId });
    });
});

// Get all requests
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Requests';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Search requests by patient name
router.get('/search', (req, res) => {
    const { patient_name } = req.query;

    // Check if patient_name query parameter is provided
    if (!patient_name) {
        return res.status(400).json({ error: 'Patient name is required for search' });
    }

    // Use a SQL query with LIKE to find matches in the database
    const sql = 'SELECT * FROM Requests WHERE patient_name LIKE ?';
    db.query(sql, [`%${patient_name}%`], (err, results) => {
        if (err) {
            console.error('Error searching requests:', err);
            return res.status(500).json({ error: 'Failed to search requests' });
        }

        // Check if results are empty
        if (results.length === 0) {
            return res.status(404).json({ error: 'No requests found matching the provided name' });
        }

        // Return the filtered results
        res.json(results);
    });
});

// Update a request by request_id
router.put('/:id', (req, res) => {
    const requestId = req.params.id;
    const { patient_name, blood_type, contact_info, request_date } = req.body;

    if (!patient_name && !blood_type && !contact_info && !request_date) {
        return res.status(400).json({ error: 'At least one field is required to update' });
    }

    let sql = 'UPDATE Requests SET';
    const params = [];

    if (patient_name) {
        sql += ' patient_name = ?,';
        params.push(patient_name);
    }
    if (blood_type) {
        sql += ' blood_type = ?,';
        params.push(blood_type);
    }
    if (contact_info) {
        sql += ' contact_info = ?,';
        params.push(contact_info);
    }
    if (request_date) {
        sql += ' request_date = ?,';
        params.push(request_date);
    }

    sql = sql.slice(0, -1) + ' WHERE request_id = ?';
    params.push(requestId);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error updating request in database:', err);
            return res.status(500).json({ error: 'Failed to update request' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.json({ message: 'Request updated successfully' });
    });
});

// Delete a request by request_id
router.delete('/:id', (req, res) => {
    const requestId = req.params.id;
    const sql = 'DELETE FROM Requests WHERE request_id = ?';

    db.query(sql, [requestId], (err, result) => {
        if (err) {
            console.error('Error deleting request from database:', err);
            return res.status(500).json({ error: 'Failed to delete request' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    });
});

module.exports = router;
