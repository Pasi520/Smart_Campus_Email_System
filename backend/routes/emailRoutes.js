const express = require('express');
const router = express.Router();

const {createEmailAccount, findEmailAccount} = require('../controllers/emailAccountController');
router.post('/', createEmailAccount);
router.get('/:studentNo', findEmailAccount);

module.exports = router;