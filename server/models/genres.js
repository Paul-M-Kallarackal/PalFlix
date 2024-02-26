const {sequelize} =require("../utils/DBConnection");
const { DataTypes } = require('sequelize');

const Genres = sequelize.define('Genres',{
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: 'genre_id'
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'genre'
    },
  },{timestamps: true});

  module.exports = Genres;