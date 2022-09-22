'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "assignments_mappings", deps: []
 * createTable "assignments_students", deps: []
 * createTable "assignments_tutors", deps: []
 * addIndex "assignments_students_assignment_id_tutor_id" to table "assignments_students"
 * addIndex "assignments_tutors_assignment_id_tutor_id" to table "assignments_tutors"
 *
 **/

var info = {
    "revision": 1,
    "name": "migration_file",
    "created": "2022-09-22T12:09:19.660Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "assignments_mappings",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "entryId": {
                    "type": Sequelize.INTEGER,
                    "field": "entryId"
                },
                "assignmentId": {
                    "type": Sequelize.STRING,
                    "field": "assignmentId"
                },
                "studentId": {
                    "type": Sequelize.INTEGER,
                    "field": "studentId"
                },
                "assignmentStatus": {
                    "type": Sequelize.INTEGER,
                    "field": "assignmentStatus"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "assignments_students",
            {
                "entryId": {
                    "type": Sequelize.INTEGER,
                    "field": "entryId",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "assignmentId": {
                    "type": Sequelize.STRING,
                    "field": "assignmentId"
                },
                "tutorId": {
                    "type": Sequelize.INTEGER,
                    "field": "tutorId",
                    "allowNull": false
                },
                "studentId": {
                    "type": Sequelize.INTEGER,
                    "field": "studentId"
                },
                "assignmentRemark": {
                    "type": Sequelize.TEXT,
                    "field": "assignmentRemark"
                },
                "assignmentStatus": {
                    "type": Sequelize.BOOLEAN,
                    "field": "assignmentStatus"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "assignments_tutors",
            {
                "assignmentId": {
                    "type": Sequelize.STRING,
                    "field": "assignmentId",
                    "primaryKey": true
                },
                "tutorId": {
                    "type": Sequelize.INTEGER,
                    "field": "tutorId",
                    "allowNull": false
                },
                "assignmentDescription": {
                    "type": Sequelize.TEXT,
                    "field": "assignmentDescription"
                },
                "assignmentPublishedAt": {
                    "type": Sequelize.DATE,
                    "field": "assignmentPublishedAt"
                },
                "assignmentDeadline": {
                    "type": Sequelize.DATE,
                    "field": "assignmentDeadline"
                },
                "assignmentStatus": {
                    "type": Sequelize.BOOLEAN,
                    "field": "assignmentStatus"
                }
            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "assignments_students",
            ["assignmentId", "tutorId"],
            {
                "indexName": "assignments_students_assignment_id_tutor_id",
                "name": "assignments_students_assignment_id_tutor_id"
            }
        ]
    },
    {
        fn: "addIndex",
        params: [
            "assignments_tutors",
            ["assignmentId", "tutorId"],
            {
                "indexName": "assignments_tutors_assignment_id_tutor_id",
                "name": "assignments_tutors_assignment_id_tutor_id"
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
