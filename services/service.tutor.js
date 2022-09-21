const db = require('../models/index').sequelize

module.exports = {

    createNewAssignment: async function (...args) {
        let err
        let isCreated = false
        try {
            const query = `CALL SP_CREATE_NEW_ASSIGNMENT (?, ?, ?, ?, ?, ?, ?, ?, ?);`
            let result = await db.query(query, {
                replacements: args,
                logging: console.log
            })

            isCreated = result && result.length ? true : false
        } catch (error) {
            //console.log(error)
            isCreated = false
            err = error
        }

        return [err, isCreated]
    },

    fetchAssignmentDetails: async function (assignmentId) {
        let err
        let result
        try {
            const query = `SELECT * FROM assignments_students where assignmentId = '${assignmentId}';`
            result = await db.query(query, {
                logging: console.log
            })

        } catch (error) {
            console.log(error)
            err = error
        }

        return [err, result]
    },

    fetchAllAssignments: async function (tutorId, publishedAt) {
        let err
        let result
        try {

            const query = publishedAt ? `SELECT * FROM assignments_tutors WHERE tutorId = '${tutorId}' AND assignmentStatus = '${publishedAt}';` : `SELECT * FROM assignments_tutors WHERE tutorId = '${tutorId}';`
            result = await db.query(query, {
                logging: console.log
            })

        } catch (error) {
            console.log(error)
            err = error
        }

        return [err, result]
    },

    insertIntoAssignmentsTutors: async function (...args) {
        let err
        let isCreated = false
        try {
            const query = `INSERT INTO assignments_tutors (assignmentId, assignmentDescription, assignmentPublishedAt, assignmentDeadline) VALUES (?, ?, ?, ?)`
            let result = await db.query(query, {
                replacements: args,
                logging: console.log
            })

            isCreated = result && result.length ? true : false
        } catch (error) {
            console.log(error)
            isCreated = false
        }

        return [err, isCreated]
    },

    insertIntoAssignmentsStudents: async function (rows) {
        let err
        let isCreated = false
        try {
            const query = `INSERT INTO assignments_students (entry_id, assignment_id, student_id) VALUES ?`
            let result = await db.query(query, {
                replacements: rows,
                logging: console.log
            })

            isCreated = result && result.length ? true : false
        } catch (error) {
            console.log(error)
            isCreated = false
        }

        return [err, isCreated]
    },
}