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
            console.log(query);
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
        //if(publishedAt && status) query = `SELECT * FROM assignments_students WHERE studentId = '${studentId}';`
        //if(publishedAt) query = `SELECT * FROM assignments_students WHERE studentId = '${studentId}';`
        if (status) query = `SELECT * FROM assignments_students WHERE studentId = '${studentId}' AND assignmentStatus = '${status}';`
        else query = `SELECT * FROM assignments_students WHERE studentId = '${studentId}';`
        return query                               
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