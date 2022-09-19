const TAG = "controller.student.js"
const httpStatus = require("http-status")
const basicUtils = require("../utils/basic.utils")

module.exports = {
    assignmentDetails: function(req, res) {
        basicUtils.logger(TAG, `Requesting assignment details`)
        return basicUtils.generateResponse(res, httpStatus.OK, `OK`)
    }
}