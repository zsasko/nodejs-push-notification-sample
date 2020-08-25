'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PushDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PushDevice.init({
    uuid: DataTypes.STRING,
    token: DataTypes.STRING,
    platform: DataTypes.ENUM('android', 'ios')
  }, {
    sequelize,
    modelName: 'PushDevice',
  });
  return PushDevice;
};