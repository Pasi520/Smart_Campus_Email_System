require('dotenv').config();

const generateEmail = (studentNo) => {
    const domain = process.env.EMAIL_DOMAIN;

    if(!studentNo){
        throw new Error ('Student number is required');
    }

    return `${studentNo.toLowerCase()}@${domain}`;
};

module.exports = {
    generateEmail
};