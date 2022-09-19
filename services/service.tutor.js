const db = require('../models/index').sequelize

module.exports = {

    createNewAssignment: async function (...args) {
        let err
        let isCreated = false
        try {
            const query = `CALL SP_CREATE_NEW_ASSIGNMENT (?, ?, ?, ?, ?, ?);`
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