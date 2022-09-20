const TAG = "controller.student.js"
const httpStatus = require("http-status")
const basicUtils = require("../utils/basic.utils")
const serviceStudent = require("../services/service.student")
const constants = require("../utils/constants")

module.exports = {
    assignmentDetails: async function (req, res) {
        try {
            basicUtils.logger(TAG, `Requesting ${req.url}`)
            const studentId = req.query.studentId
            const assignmentId = req.query.assignmentId

            if (studentId && !isNaN(studentId) && assignmentId) {
                const result1 = await serviceStudent.fetchAssignmentDetails(studentId, assignmentId)
                if (result1 && result1.length) {
                    if (result1[0]) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENT_DETAILS_ERR, { error: "" + result1[0] })
                    if (result1[1] && result1[1].length && result1[1][0] && result1[1][0].length) return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.ASSIGNMENT_DETAILS_SUCCESS, { assignmentDetails: result1[1][0] })
                    else return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.ASSIGNMENT_DETAILS_EMPTY)
                }
            } else return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.ID_INVALID)

        } catch (error) {
            console.log(error);
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENT_DETAILS_ERR, { error: "" + error })
        }

        return basicUtils.generateResponse(res)
    },

    assignmentAll: async function (req, res) {
        try {
            basicUtils.logger(TAG, `Requesting ${req.url}`)
            const studentId = req.params.id
            if (studentId && !isNaN(studentId)) {
                const result1 = await serviceStudent.fetchAllAssignments(studentId)
                if (result1 && result1.length) {
                    if (result1[0]) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENTS_ERR, { error: "" + result1[0] })
                    if (result1[1] && result1[1].length && result1[1][0] && result1[1][0].length) return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.ASSIGNMENTS_SUCCESS, { assignmentDetails: result1[1][0] })
                    else return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.ASSIGNMENTS_EMPTY)
                }
            } else return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.ID_INVALID)

        } catch (error) {
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENTS_ERR, { error: "" + error })
        }
        return basicUtils.generateResponse(res)
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