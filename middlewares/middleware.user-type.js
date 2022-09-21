require('dotenv').config()
const TAG = "middleware.user-type.js"

const httpStatus = require('http-status');
const basicUtils = require('../utils/basic.utils');
const constants = require('../utils/constants');

module.exports = {
    checkUserType: function (req, res, next) {
        try {
            const userType = res.locals.user.userType
            const requiredUserType = res.locals.userType
            if (userType == requiredUserType) {
                next()
            } else return basicUtils.generateResponse(res, httpStatus.UNAUTHORIZED, constants.messages.USER_NOT_ALLOWED)
        } catch (error) {
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SIGNIN_ERR, { error: "" + error })
        }
    },

    setTutorUserType: function (req, res, next) {
        res.locals.userType = 0
        next()
    },


    setStudentUserType: function (req, res, next) {
        res.locals.userType = 1
        next()
    }


}