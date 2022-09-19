const TAG = "controller.tutor.js"

const httpStatus = require("http-status")
const { v4 } = require("uuid")
const serviceTutor = require("../services/service.tutor")
const basicUtils = require("../utils/basic.utils")
const constants = require("../utils/constants")

module.exports = {
    assignmentCreate: async function (req, res) {
        basicUtils.logger(TAG, `Requesting ${req.url}`)
        try {
            const {
                assignmentDescription,
                assignmentPublishedAt,
                assignmentDeadline,
                assignmentStudents } = { ...req.body }

            const assignmentId = v4()
            let assignmentsStudentsRows = []
            let assignmentStudentsStr = ""
            let assignmentStudentsCount

            /* if (assignmentStudents && Array.isArray(assignmentStudents) && assignmentStudents.length) {
                assignmentsStudentsRows = assignmentStudents.map((studentId) => {
                    return Object.values({ assignmentId, studentId })
                })
            } */

            if (assignmentStudents && Array.isArray(assignmentStudents) && assignmentStudents.length) {
                assignmentStudentsStr = assignmentStudents.join(',')
                assignmentStudentsCount = assignmentStudents.length
            }

            const result1 = await serviceTutor.createNewAssignment(
                assignmentId,
                assignmentDescription,
                assignmentPublishedAt,
                assignmentDeadline,
                assignmentStudentsStr,
                assignmentStudentsCount
            )

            if (result1 && result1.length) {
                if (result1[0]) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENT_CREATE_ERR, { error: "" + result1[0] })
                if (result1[1]) return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.ASSIGNMENT_CREATE_SUCCESS)
            }

        } catch (error) {
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENT_CREATE_ERR, { error: "" + error })
        }

        return basicUtils.generateResponse(res)
    },

    assignmentUpdate: function (req, res) {
        basicUtils.logger(TAG, `Requesting ${req.url}`)
        return basicUtils.generateResponse(res, httpStatus.OK, `OK`)
    },

    assignmentDelete: function (req, res) {
        basicUtils.logger(TAG, `Requesting ${req.url}`)
        return basicUtils.generateResponse(res, httpStatus.OK, `OK`)
    },


    assignmentDetails: function (req, res) {
        basicUtils.logger(TAG, `Requesting ${req.url}`)
        return basicUtils.generateResponse(res, httpStatus.OK, `OK`)
    },

    assignmentAll: function (req, res) {
        basicUtils.logger(TAG, `Requesting ${req.url}`)
        return basicUtils.generateResponse(res, httpStatus.OK, `OK`)
    }
}