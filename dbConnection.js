// dbConnection.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'Ankita@1312', // Your MySQL password
    database: 'blooddonation' // Corrected database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;

