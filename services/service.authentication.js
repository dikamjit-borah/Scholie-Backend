const db = require('../models/index').sequelize

module.exports = {
    authenticateUser: async function (userName, userPassword) {
        //todo - validate username and userpassword in users table
        let isValidUser = false
        let err
        return [null, isValidUser = true]
    },

    generateAuthToken: async function (userName, password) {
        const authToken = "authToken"
        return authToken
    }
}