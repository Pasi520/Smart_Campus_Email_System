const db = require('../config/db');
const {generateEmail} = require('../services/emailService');

const register = async(req,res) => {
    try{
        const{
            user_id,
            student_no,
            full_name,
            course,
            batch,
            phone,
            status
        } = req.body;

        const campusEmail = generateEmail(student_no);

        // if required field
        if(!user_id || !student_no || !full_name || !course || !batch) {
            return res.status(400).json({
                success: false,
                message: 'user_id, student_no, full_name, course and batch are required'
            });
        }

        const [result] = await db.query(
            `INSERT INTO students
            (user_id, student_no, full_name, course, batch, phone, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                student_no,
                full_name,
                course,
                batch,
                phone || null,
                status || 'active'
                
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            student_id: result.insertId,
            campus_email: campusEmail
        });

    }
    
    catch (error) {
        console.error('Student registration error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to register student'
        });
    } 

};

module.exports = {
    register
};