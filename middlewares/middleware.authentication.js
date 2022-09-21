require('dotenv').config()
const TAG = "middleware.authentication.js"

const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const basicUtils = require('../utils/basic.utils');
const constants = require('../utils/constants');

module.exports = {
    authenticateUser: function (req, res, next) {
        const token = req.headers.authorization
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    return basicUtils.generateResponse(res, httpStatus.UNAUTHORIZED, constants.messages.USER_UNAUTHORIZED, { error: "" + err })
                } else {
                    res.locals.user = decodedToken
                    next();
                }
            });
        } else {
            return basicUtils.generateResponse(res, httpStatus.UNAUTHORIZED, constants.messages.USER_UNAUTHORIZED)
        }
    }
}