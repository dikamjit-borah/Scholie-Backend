const TAG = "controller.student.js"
const httpStatus = require("http-status")
const basicUtils = require("../utils/basic.utils")
const serviceStudent = require("../services/service.student")
const constants = require("../utils/constants")

module.exports = {
    assignmentDetails: function (req, res) {
        basicUtils.logger(TAG, `Requesting ${req.url}`)
        return basicUtils.generateResponse(res, httpStatus.OK, `OK`)
    },

    assignmentAll: function (req, res) {
        basicUtils.logger(TAG, `Requesting ${req.url}`)
        return basicUtils.generateResponse(res, httpStatus.OK, `OK`)
    },

    assignmentSubmit: async function (req, res) {
        try {
            basicUtils.logger(TAG, `Requesting ${req.url}`)
            const { studentId, assignmentId, assignmentRemark } = { ...req.body }
            const result1 = await serviceStudent.submitAssignment(studentId, assignmentId, assignmentRemark)
            if (result1 && result1.length) {
                if (result1[0]) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENT_SUBMIT_ERR, { error: "" + result1[0] })
                if (result1[1]) {
                    if (result1[1] && result1[1][0] && result1[1][0][0]) return basicUtils.generateResponse(res, httpStatus.OK, Object.values(result1[1][0][0]).toString())
                }
            }

        } catch (error) {
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENT_SUBMIT_ERR, { error: "" + error })
        }

        return basicUtils.generateResponse(res)
    }
}