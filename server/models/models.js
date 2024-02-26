const {sequelize} =require("../utils/DBConnection");
const db={};
db.sequelize = sequelize;
db.actors = require("./actors");
db.movies = require("./movies");
db.cron=require("./cron");
db.genres = require("./genres");
db.productionCrew = require("./productionCrew");
db.users = require("./users");
db.crew=require("./crew");
db.movie_genre = require("./movie_genre");
db.images=require("./images");

db.movies.belongsToMany(db.genres, {  through: "movie_genre", foreignKey: 'movie_id' });
db.genres.belongsToMany(db.movies, {  through: "movie_genre" ,foreignKey: 'genre_id'});

db.actors.belongsTo(db.crew, { foreignKey: 'person_id' });
db.crew.hasMany(db.actors, { foreignKey: 'person_id' });

db.productionCrew.belongsTo(db.crew, { foreignKey: 'person_id' });
db.crew.hasMany(db.productionCrew, { foreignKey: 'person_id' });

db.movies.belongsToMany(db.actors, {  through: "movie_actor", foreignKey: 'movie_id' });
db.actors.belongsToMany(db.movies, {  through: "movie_actor" ,foreignKey: 'person_id'});
// db.sequelize.sync({ force: false ,alter:true}).then(async () => {
//     ("yes re-sync done!");
// });

module.exports = db;