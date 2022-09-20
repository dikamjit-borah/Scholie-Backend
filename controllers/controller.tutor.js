const TAG = "controller.tutor.js"

const httpStatus = require("http-status")
const { v4 } = require("uuid")
const serviceTutor = require("../services/service.tutor")
const basicUtils = require("../utils/basic.utils")
const constants = require("../utils/constants")

module.exports = {
    assignmentCreate: async function (req, res) {
        try {
            basicUtils.logger(TAG, `Requesting ${req.url}`)
            const {
                assignmentDescription,
                assignmentPublishedAt,
                assignmentDeadline,
                assignmentStudents,
                assignmentStatus,
                tutorId } = { ...req.body }

            const assignmentId = v4()   //generate assignment id with uuid
            let assignmentStudentsStr = ""
            let assignmentStudentsCount

            /* 
            let assignmentsStudentsRows = []
            if (assignmentStudents && Array.isArray(assignmentStudents) && assignmentStudents.length) {
                assignmentsStudentsRows = assignmentStudents.map((studentId) => {
                    return Object.values({ assignmentId, studentId })
                })
            } */

            if (assignmentStudents && Array.isArray(assignmentStudents) && assignmentStudents.length) {
                assignmentStudentsStr = assignmentStudents.join(',') //create str for sending as param to sp
                assignmentStudentsCount = assignmentStudents.length
            }

            const result1 = await serviceTutor.createNewAssignment(
                assignmentId,
                assignmentDescription,
                assignmentPublishedAt,
                assignmentDeadline,
                assignmentStatus == '1' ? 1 : 0,
                tutorId,
                assignmentStudentsStr,
                assignmentStudentsCount,
                assignmentStatusStudent = assignmentStatus == '1' ? 1 : 0,
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


    assignmentDetails: async function (req, res) {
        try {
            basicUtils.logger(TAG, `Requesting ${req.url}`)
            const assignmentId = req.params.id
            if (assignmentId) {
                const result1 = await serviceTutor.fetchAssignmentDetails(assignmentId)
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
            const tutorId = req.params.id
            if (tutorId) {
                const result1 = await serviceTutor.fetchAllAssignments(tutorId)
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
    }
}