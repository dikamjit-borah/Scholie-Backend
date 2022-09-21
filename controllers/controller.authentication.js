const TAG = "controller.authentication.js"

const httpStatus = require("http-status")
const serviceAuthentication = require("../services/service.authentication")
const basicUtils = require("../utils/basic.utils")
const constants = require("../utils/constants")

module.exports = {
    authenticationSignIn: async function (req, res) {
        try {
            basicUtils.logger(TAG, `Requesting ${req.url}`)
            const { userName, userPassword, userType } = { ...req.body }
            console.log(req.body);
            if (userName && userPassword && userType && !isNaN(userType)) {
                const result1 = await serviceAuthentication.authenticateUser(userName, userPassword)
                if (result1 && result1.length) {
                    if (result1[0]) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SIGNIN_ERR, { error: "" + result1[0] })
                    if (result1[1]) {
                        const authToken = serviceAuthentication.generateAuthToken(userName, userType)
                        return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.SIGNIN_SUCCESS, { authToken })
                    } else return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.SIGNIN_FAILED)
                }
            } else return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.USER_EMPTY)

        } catch (error) {
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENTS_ERR, { error: "" + error })
        }
        return basicUtils.generateResponse(res)
    }
}