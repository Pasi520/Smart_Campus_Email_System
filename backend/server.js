const express = require('express');
require('dotenv').config();

const db = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

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
app.get('/api/test-db', async(req, res) =>{
    try {
        const [row] = await db.query('SELECT 1 AS result');

        res.json({
            success: true,
            message: 'Successfully',
            result: row[0]
        });
    }

    catch(error){
        console.error('Connection error', error);

        res.status(500).json({
            success: false,
            message: 'Connection failed'
        })
        
    }
});

// student routes
app.use('api/students', studentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


