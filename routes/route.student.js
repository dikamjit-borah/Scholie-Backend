const express = require('express')
const controllerStudent = require('../controllers/controller.student')
const router = express.Router()

router.get('/student/assignment/details/:id', controllerStudent.assignmentDetails) //If the API is called by a student, then only the student’s submission should be returned
router.get('/student/assignment/all/:id', controllerStudent.assignmentAll) //For students, the feed will return all the assignments assigned to the student

router.post('/student/assignment/submit', controllerStudent.assignmentSubmit)


module.exports = router