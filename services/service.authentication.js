require('dotenv').config()

const db = require('../models/index').sequelize
const jwt = require('jsonwebtoken')

module.exports = {
    authenticateUser: async function (userName, userPassword) {
        //todo - validate username and userpassword in users table
        let isValidUser = false
        let err
        return [null, isValidUser = true]
    },

    generateAuthToken: function (userName, userType) {
        const user = { userName, userType }
        const authToken = jwt.sign(user, process.env.JWT_SECRET)
        return authToken
    }
}