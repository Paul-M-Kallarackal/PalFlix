const {sequelize} =require("../utils/DBConnection");
const { DataTypes } = require('sequelize');

const Crew = sequelize.define('Crew',{
    personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: 'person_id'
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'name'
        },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'gender'
        },
    imageUrl:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field:'image_url'
        },
    
},{timestamps: true,freezeTableName: true,});

module.exports = Crew;