const { DataTypes } = require('sequelize');
const {sequelize} =require("../utils/DBConnection");
const MovieGenre = sequelize.define('movie_genre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    },
},);

module.exports = MovieGenre;
