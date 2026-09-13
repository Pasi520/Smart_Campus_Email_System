const express = require('express');
const router = express.Router();

const {register,getStudents,getStudentNo} = require('../controllers/studentRegistration');

router.post('/',register);
router.get('/',getStudents);
router.get('/:studentNo',getStudentNo);

module.exports = router;