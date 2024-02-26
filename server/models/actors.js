const {sequelize} =require("../utils/DBConnection");

const { DataTypes } = require('sequelize');

const Actors = sequelize.define('Actors',{
    actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: 'actor_id'   
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

module.exports = Actors;