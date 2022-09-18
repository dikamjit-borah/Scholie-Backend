const express = require('express')
const router = express.Router()

router.get('/assignment/details/:id', ()=>{}) //If the API is called by a student, then only the student’s submission should be returned
router.get('/assignment/all', ()=>{}) //For students, the feed will return all the assignments assigned to the student


module.exports = router