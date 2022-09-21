const db = require('../models/index').sequelize

module.exports = {

    fetchAssignmentDetails: async function (studentId, assignmentId) {
        let err
        let result
        try {
            const query = `SELECT * FROM assignments_students WHERE studentId = '${studentId}' && assignmentId = '${assignmentId}';`
            result = await db.query(query, {
                logging: console.log
            })

        } catch (error) {
            console.log(error)
            err = error
        }

        return [err, result]
    },

    fetchAllAssignments: async function (studentId, publishedAt, status) {
        let err
        let result
        try {
            const query = this.queryFetchAllAssignments(studentId, publishedAt, status)
            result = await db.query(query, {
                logging: console.log
            })

        } catch (error) {
            console.log(error)
            err = error
        }

        return [err, result]
    },

    queryFetchAllAssignments: function (studentId, publishedAt, status) {
        let query
        if (publishedAt && status) return query = `SELECT * from assignments_students where assignmentId in (SELECT assignmentId from assignments_tutors where assignmentStatus = '${publishedAt}') AND assignmentStatus = '${status}' AND studentId = '${studentId}';`
        if (publishedAt) return query = `SELECT * from assignments_students where assignmentId in (SELECT assignmentId from assignments_tutors where assignmentStatus = '${publishedAt}') AND studentId = '${studentId}';`
        if (status) return query = `SELECT * from assignments_students WHERE assignmentStatus = '${status}' AND studentId = '${studentId}';`
        else return query = `SELECT * FROM assignments_students WHERE studentId = '${studentId}';`
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