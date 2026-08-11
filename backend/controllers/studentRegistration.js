const db = require('../config/db');

const register = async(req,res) => {
    try{
        const{
            user_id,
            student_no,
            full_name,
            course,
            batch,
            phone,
            status,
            dob,
            gender,
            address,
            guardian_name,
            guardian_phone,
            enrollment_date,
            graduation_year
        } = req.body;

        // if required field
        if(!user_id || !student_no || !full_name || !course || !batch) {
            return res.status(400).json({
                success: false,
                message: 'user_id, student_no, full_name, course and batch are required'
            });
        }

        const [result] = await db.query(
            `INSERT INTO students
            (user_id, student_no, full_name, course, batch, phone, status,
             dob, gender, address, guardian_name, guardian_phone,
             enrollment_date, graduation_year)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                student_no,
                full_name,
                course,
                batch,
                phone || null,
                status || 'active',
                dob || null,
                gender || null,
                address || null,
                guardian_name || null,
                guardian_phone || null,
                enrollment_date || null,
                graduation_year || null
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            student_id: result.insertId
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