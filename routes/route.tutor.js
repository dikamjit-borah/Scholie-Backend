const express = require('express')
const router = express.Router()

router.post('/assignment/create', ()=>{}) 
router.patch('/assignment/update/:id',()=>{})
router.delete('/assignment/delete/:id',()=>{})

router.get('/assignment/details/:id', ()=>{}) //If the API is called by a tutor then all the submissions added for the assignment by the assigned students should be returned
router.get('/assignment/all', ()=>{}) //For a tutor, the feed will return all the assignments created by the tutor
module.exports = router