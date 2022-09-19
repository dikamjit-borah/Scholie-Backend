const TAG = "controller.tutor.js"

const httpStatus = require("http-status")
const { v4 } = require("uuid")
const serviceTutor = require("../services/service.tutor")
const basicUtils = require("../utils/basic.utils")
const constants = require("../utils/constants")

module.exports = {
    assignmentCreate: async function (req, res) {
        basicUtils.logger(TAG, `Requesting ${req.url}`)
        const {
            assignmentDescription,
            assignmentPublishedAt,
            assignmentDeadline,
            assignmentStudents } = { ...req.body }

        const assignmentId = v4()

        try {
            const result = await serviceTutor.createNewAssignment(
                assignmentId,
                'assignmentDescription',
                new Date(),
                new Date(),
                [1, 2, 3])

            if (result && result.length) {
                if (result[0]) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ASSIGNMENT_CREATE_ERR, { error: "" + result[0] })
                if (result[1]) return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.ASSIGNMENT_CREATE_SUCCESS)
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