'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignments_mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assignments_mapping.init({
    entryId: DataTypes.INTEGER,
    assignmentId: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    assignmentStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'assignments_mapping',
  });
  return assignments_mapping;
};