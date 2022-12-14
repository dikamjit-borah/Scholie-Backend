const express = require('express')
const controllerTutor = require('../controllers/controller.tutor')
const middlewareUserType = require('../middlewares/middleware.user-type')
const router = express.Router()

router.post('/tutor/assignment/create',
    middlewareUserType.setTutorUserType,
    middlewareUserType.checkUserType,
    controllerTutor.assignmentCreate)

router.patch('/tutor/assignment/update/:id',
    middlewareUserType.setTutorUserType,
    middlewareUserType.checkUserType,
    controllerTutor.assignmentUpdate)

router.delete('/tutor/assignment/delete/:id',
    middlewareUserType.setTutorUserType,
    middlewareUserType.checkUserType,
    controllerTutor.assignmentDelete)

router.get('/tutor/assignment/details/:id',
    middlewareUserType.setTutorUserType,
    middlewareUserType.checkUserType,
    controllerTutor.assignmentDetails) //If the API is called by a tutor then all the submissions added for the assignment by the assigned students should be returned

router.get('/tutor/assignment/all/:id',
    middlewareUserType.setTutorUserType,
    middlewareUserType.checkUserType,
    controllerTutor.assignmentAll) //For a tutor, the feed will return all the assignments created by the tutor

module.exports = router