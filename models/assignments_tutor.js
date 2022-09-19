'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignments_tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assignments_tutor.init({
    assignmentId: DataTypes.STRING,
    assignmentDescription: DataTypes.STRING,
    assignmentPublishedAt: DataTypes.DATE,
    assignmentDeadline: DataTypes.DATE,
    assignmentStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'assignments_tutor',
  });
  return assignments_tutor;
};