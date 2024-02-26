const {sequelize} =require("../utils/DBConnection");
const { DataTypes,Sequelize } = require('sequelize');

const Movies = sequelize.define('Movies',{
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: 'movie_id'
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'release_date'
    },
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: false,
      field: 'image_url'
    },
    rating: {
      type: DataTypes.FLOAT,
      field: 'rating'
      },
  },{timestamps: true});

  module.exports = Movies;