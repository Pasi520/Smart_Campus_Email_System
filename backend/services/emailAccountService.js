const db = require('../config/db');
const { generateEmail } = require('./emailService');
const {
    generateTempPassowrd,
    hashPassword
} = require('./passwordService');


// create email account
const createEmailAccounts = async (studentNo = null) => {
    let students;

    // Single student
    if (studentNo) {
        const [rows] = await db.query(
            `SELECT student_id, student_no
             FROM students
             WHERE student_no = ?`,
            [studentNo]
        );

        if (rows.length === 0) {
            throw new Error('Student not found');
        }

        students = rows;
    }

    // All students
    else {
        const [rows] = await db.query(
            `SELECT student_id, student_no
             FROM students`
        );

        students = rows;
    }

    const createAccounts = [];
    const skippedAccount = [];

    for (const student of students) {

        // Check existing email account
        const [existing] = await db.query(
            `SELECT email_id
             FROM email_accounts
             WHERE student_id = ?`,
            [student.student_id]
        );

        if (existing.length > 0) {
            skippedAccount.push({
                student_id: student.student_id,
                student_no: student.student_no,
                reason: 'Email account already exists'
            });

            continue;
        }

        // Generate email
        const campusEmail = generateEmail(student.student_no);

        // Generate temporary password
        const tempPassword = generateTempPassowrd();

        // Hash password
        const passwordHash = await hashPassword(tempPassword);

        // Save email account
        const [result] = await db.query(
            `INSERT INTO email_accounts
            (student_id, campus_email, password_hash)
            VALUES (?, ?, ?)`,
            [
                student.student_id,
                campusEmail,
                passwordHash
            ]
        );

        createAccounts.push({
            email_id: result.insertId,
            student_id: student.student_id,
            student_no: student.student_no,
            campus_email: campusEmail,
            temporary_password: tempPassword
        });
    }

    return {
        createAccounts,
        skippedAccount
    };
};

// show email account details 
const getEmailAccount = async (studentNo) => {
    const [rows] = await db.query(
        `SELECT 
            e.email_id,
            e.student_id,
            s.student_no,
            e.campus_email,
            e.account_status,
            e.quota_mb,
            e.storage_used_mb,
            e.is_verified,
            e.activated_date,
            e.suspended_date,
            e.expiry_date,
            e.created_date,
            e.last_login
         FROM email_accounts e
         INNER JOIN students s
             ON e.student_id = s.student_id
         WHERE s.student_no = ?`,
        [studentNo]
    );

    if(rows.length === 0){
        throw new Error('Email account not found');
    }

    return rows[0];
};

module.exports = {
    createEmailAccounts,
    getEmailAccount
};