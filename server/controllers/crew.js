const { where } = require('sequelize');
const db = require('../models/models');
async function actorDetails(request, reply) {
    try {
        const personId = request.params.actorId;
        const actor = await db.actors.findOne({
            where: {
               personId
            },
            include: [{
                model: db.crew,
            }]
        });
        const returnedActor={
            imageUrl:actor.Crew.imageUrl,
            name:actor.Crew.name,
            role:actor.Crew.role,
            gender:actor.Crew.gender
        }
        reply(returnedActor);
    } catch (error) {
        console.error('Error populating actor details:', error);
        reply([]);
    }
}
async function actorMovies(request, reply) {
    try {
        const personId = request.params.actorId;
        const movie = await db.actors.findAll({
            attributes: ['movieId'],
            where: {
                personId
            },
        });
        const movies = await db.movies.findAll({
            where: {
                movieId: movie.map(m => m.movieId)
            }
        });
        reply(movies);
    } catch (error) {
        console.error('Error populating actor movies:', error);
        reply([]);
    }
}
async function productionCrewMovies(request, reply) {
    try {
        const personId = request.params.productionCrewId;
        const movie = await db.productionCrew.findAll({
            attributes: ['movieId'],
            where: {
                personId
            },
        });
        const movies = await db.movies.findAll({
            where: {
                movieId: movie.map(m => m.movieId)
            }
        });
        reply(movies);
    } catch (error) {
        console.error('Error populating production crew movies:', error);
        reply([]);
    }
}

async function productionCrewDetails(request, reply) { 
    try {
        const personId = request.params.productionCrewId;
        const prodCrew = await db.productionCrew.findOne({
            where: {
                personId
            },
            include: [{
                model: db.crew,
            }]
        });
        const returnedProdCrew={
            imageUrl:prodCrew.Crew.imageUrl,
            name:prodCrew.Crew.name,
            role:prodCrew.Crew.role,
            gender:prodCrew.Crew.gender
        }
        reply(returnedProdCrew);
    } catch (error) {
        console.error('Error populating production crew details:', error);
        reply([]);
    }}



    module.exports = {
        actorDetails,
        productionCrewDetails,
        actorMovies,
        productionCrewMovies
    }