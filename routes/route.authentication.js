const express = require('express')
const controllerAuthentication = require('../controllers/controller.authentication')
const router = express.Router()

router.post('/authentication/signIn', controllerAuthentication.authenticationSignIn)


module.exports = router