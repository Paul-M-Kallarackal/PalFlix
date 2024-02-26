const {sequelize} =require("../utils/DBConnection");
const { DataTypes } = require('sequelize');

const Images = sequelize.define('Images',{
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: 'image_id'
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'movie_id',
        references: {
          model: 'Movies',
          key: 'movie_id'
        }},
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'image_url'
    },


  },{timestamps: true});

  module.exports = Images;