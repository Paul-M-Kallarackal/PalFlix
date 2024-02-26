const {sequelize} =require("../utils/DBConnection");
const { DataTypes } = require('sequelize');

const ProductionCrew = sequelize.define('ProductionCrew',{
    productionCrewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: 'production_crew_id'
        },
    personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'person_id'
        },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'movie_id'
        },
    role: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'role'
        },
    },{timestamps: true});

module.exports = ProductionCrew;