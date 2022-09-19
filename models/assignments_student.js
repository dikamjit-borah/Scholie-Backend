'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignments_student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assignments_student.init({
    entryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    assignmentId: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    assignmentRemark: DataTypes.STRING,
    assignmentStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'assignments_student',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return assignments_student;
};