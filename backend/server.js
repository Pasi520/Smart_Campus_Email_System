const express = require('express');
require('dotenv').config();

const db = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({
        message: 'Smart Campus Email System API is running'
    });
});

// Mysql Database Test router


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});