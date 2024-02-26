const userControllers = require('./users');
const generalControllers = require('./general');
const movieControllers=require('./movies');
const crewControllers=require('./crew');
const genreControllers=require('./genre');
module.exports = {
    userControllers   ,
    generalControllers ,
    movieControllers,
    crewControllers,
    genreControllers
}