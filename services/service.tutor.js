const db = require('../models/index').sequelize

module.exports = {
    createNewAssignment: async function (...args) {
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
    }
}