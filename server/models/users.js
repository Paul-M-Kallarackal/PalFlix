const {sequelize} =require("../utils/DBConnection");
const { DataTypes } = require('sequelize');

const Users = sequelize.define('Users',{
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id'
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'username'
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
  } ,{timestamps: true});

  module.exports = Users;