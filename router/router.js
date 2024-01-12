const express = require('express');

const router = express.Router();

const {registerStudent, loginStudent, enterScore, viewScores, viewOne, updateScore, deleteScore, logOut} = require('../controller/controller');
const {authenticate} = require('../middleware/authenticate')

//endpoint to register a new student
router.post('/register', registerStudent)

//endpoint to login a registered student
router.post('/login', loginStudent)

//endpoint to enter the score of a login student
router.post('/addscore', authenticate, enterScore)  

//endpoint to view the students scores when login is successful
router.get('/view', authenticate, viewScores)

//endpoint to view the students scores by their id
router.get('/viewone', authenticate, viewOne);

//endpoint to update a student's scores when login is successful
router.put('/update', authenticate, updateScore);

//endpoint to delete a student's scores when login is unsuccessful
router.delete('/delete', authenticate, deleteScore);

//endpoint to logOut a student
router.put('/logout', authenticate, logOut);


module.exports = router; 