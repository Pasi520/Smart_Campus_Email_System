const express = require('express');
const router = express.Router();

const {register,getStudents,getStudentId} = require('../controllers/studentRegistration');

router.post('/',register);
router.get('/',getStudents);
router.get('/:id',getStudentId);

module.exports = router;