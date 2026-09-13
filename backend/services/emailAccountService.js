const db = require('../config/db');
const {generateEmail} = require('./emailService');
const {generateTempPassowrd, hashPassword} = require('./passwordService');

const createEmailAccount = async (studentNo = null) => {
    let students;

    if(studentNo) {
        const [rows] = await db.query(
            `SELECT student_id, student_no
             FROM students
             WHERE student_no = ?`,
             [studentNo]
        );

        if(rows.length === 0) {
            throw new Error("Student not found");
            
        }

        students = rows;
    }
    else{
        const [rows] = await db.query(
            `SELECT student_id,student_no
             FROM students`
        );
        students = rows;
    }

    const createAccounts = [];
    const skippedAccount = [];

    for (const studet of students) {

        conste [existing] = await db.query(
            `SELECT email_id
             FROM email_accounts
             WHERE student_id = ?`,
             [student.student_id]
        );

        if (existing.length > 0)  {
            skippedAccount.push({
                email_id: XPathResult.insertId,
                student_id: studet.student_id,
                studet_no: studet.student_no,
                reason: 'Email account already exists'
            });
            continue;
        }
    }
};