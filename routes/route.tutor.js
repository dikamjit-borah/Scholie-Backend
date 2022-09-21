const express = require('express')
const controllerTutor = require('../controllers/controller.tutor')
const middlewareAuthentication = require('../middlewares/middleware.authentication')
const router = express.Router()


router.post('/tutor/assignment/create', middlewareAuthentication.authenticateUser, controllerTutor.assignmentCreate)
router.patch('/tutor/assignment/update/:id', controllerTutor.assignmentUpdate)
router.delete('/tutor/assignment/delete/:id', controllerTutor.assignmentDelete)

router.get('/tutor/assignment/details/:id', controllerTutor.assignmentDetails) //If the API is called by a tutor then all the submissions added for the assignment by the assigned students should be returned
router.get('/tutor/assignment/all/:id', controllerTutor.assignmentAll) //For a tutor, the feed will return all the assignments created by the tutor

module.exports = router