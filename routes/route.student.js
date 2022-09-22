const express = require('express')
const controllerStudent = require('../controllers/controller.student')
const middlewareUserType = require('../middlewares/middleware.user-type')
const router = express.Router()

router.get('/student/assignment/details/',
    middlewareUserType.setStudentUserType,
    middlewareUserType.checkUserType,
    controllerStudent.assignmentDetails) //If the API is called by a student, then only the student’s submission should be returned

router.get('/student/assignment/all/:id',
    middlewareUserType.setStudentUserType,
    middlewareUserType.checkUserType,
    controllerStudent.assignmentAll) //For students, the feed will return all the assignments assigned to the student

router.post('/student/assignment/submit',
    middlewareUserType.setStudentUserType,
    middlewareUserType.checkUserType,
    controllerStudent.assignmentSubmit)

module.exports = router