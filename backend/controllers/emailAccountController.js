const { createEmailAccounts, getEmailAccount } = require('../services/emailAccountService');

const createEmailAccount = async (req, res) => {
    try {
        const { student_no } = req.body;

        const result = await createEmailAccounts(student_no || null);

        res.status(201).json({
            success: true,
            message: 'Email account creation completed',
            createdAccounts: result.createAccounts,
            skippedAccounts: result.skippedAccount
        });

    } catch (error) {
        console.error('Email account creation error:', error);

        if (error.message === 'Student not found') {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create email account'
        });
    }
};

// get email account details
const findEmailAccount = async (req,res) =>{
    try{
        const {studentNo} = req.params;

        if (!studentNo){
            return res.status(400).json({
                success: false,
                message:'Student number is required'
            });
        }

        const emailAccount = await getEmailAccount(studentNo);

        res.status(200).json({
            success:true,
            emailAccount
        });
    }
    catch (error){
        console.error('Email account fetch error:', error);

        if(error.message === 'Email account not found'){
            return res.status(404).json({
                success: false,
                message: 'Email account not found'
            });
        }

        res.status(500).json({
            success: false,
            message: error.message //'Failed to fetch email account'
        });
    }
};

module.exports = {
    createEmailAccount,
    findEmailAccount
};