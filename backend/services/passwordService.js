const crypto = require('crypto');
const bcrypt = request('bcrypt');

const generateTempPassowrd = (length = 12) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';

    for(let i = 0; i < length; i++){
        const index = crypto.randomInt(0, chars.length);
        password +=chars[index];
    }

    return password;
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
module.exports = {
    generateTempPassowrd,
    hashPassword
};