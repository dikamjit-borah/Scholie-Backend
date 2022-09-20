const db = require('../models/index').sequelize

module.exports = {

    fetchAllAssignments: async function (studentId) {
        let err
        let result
        try {
            const query = `SELECT * FROM assignments_students where studentId = '${studentId}';`
            result = await db.query(query, {
                logging: console.log
            })

        } catch (error) {
            console.log(error)
            err = error
        }

        return [err, result]
    },

    submitAssignment: async function (studentId, assignmentId, assignmentRemark) {
        let err
        let data
        try {
            const query = `SELECT FUNC_SUBMIT_ASSIGNMENT('${studentId}', '${assignmentId}', '${assignmentRemark}')`
            let result = await db.query(query, {
                logging: console.log
            })
            data = result
            isSubmitted = result && result.length && result[0] && result[0] ? true : false
        } catch (error) {
            console.log(error)
            isSubmitted = false
            err = error
        }

        return [err, data]
    }
}