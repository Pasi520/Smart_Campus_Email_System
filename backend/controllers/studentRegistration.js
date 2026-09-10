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

// get students rows 
const getStudents = async (req,res) => {
    try{
        const [rows] = await db.query(
            `SELECT * FROM students`
        );

        res.status(200).json({
            success: true,
            students: rows
        });
    }

    catch (error) {
        console.error('Error fetching students:', error);

        res.status(500).json({
            success:false,
            message: 'Failed to fetch students'
        });
    }
};

// get one student row
const getStudentId = async(req, res) =>{
    try {

        const studentId = Number(req.params.id);

        // validate studend ID
        if( !Number.isInteger(studentId) || studentId <= 0){
            return res.status(400).json({
                success: false,
                message: 'Invalid student ID'
            });
        }

        // select studentId
        const[rows] = await db.query(
            `SELECT * FROM students WHERE student_id = ?`,
            [studentId]
        );

        // student not found
        if(rows.length === 0){
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        // return student
        res.status(200).json({
            success: true,
            student:rows[0]
           });
    } catch(error){
        console.error('Error fetching student:', error);

        res.status(500).json({
            success: false,
            message:'Faild to fetch '
        });
    }
};

module.exports = {
    register,
    getStudents,
    getStudentId 
};