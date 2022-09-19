'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "assignments_mappings", deps: []
 * createTable "assignments_students", deps: []
 * createTable "assignments_tutors", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "migration_file",
    "created": "2022-09-19T13:08:13.584Z",
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
                "assignmentRemark": {
                    "type": Sequelize.STRING,
                    "field": "assignmentRemark"
                },
                "assignmentStatus": {
                    "type": Sequelize.INTEGER,
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
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "assignmentId": {
                    "type": Sequelize.STRING,
                    "field": "assignmentId"
                },
                "assignmentDescription": {
                    "type": Sequelize.STRING,
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
                    "type": Sequelize.INTEGER,
                    "field": "assignmentStatus"
                }
            },
            {}
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
