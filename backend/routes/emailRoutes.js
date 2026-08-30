const express = require('express');
const router = express.Router();

const { generateEmail } = require('../services/emailService');

router.get('/test/:studentNo', (req, res) => {
    try {
        const { studentNo } = req.params;

        const campusEmail = generateEmail(studentNo);

        res.status(200).json({
            success: true,
            campus_email: campusEmail
        });

    } catch (error) {
        console.error('Email generation error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to generate email'
        });
    }
});

module.exports = router;