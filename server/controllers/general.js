const logger = require('../utils/logConnection');
const eclient = require('../utils/elasticConnection');
const db = require('../models/models');
const axios = require('axios');

function apiTesting(request, reply) {
    logger.info('Backend hit');
    reply('Welcome to the backend!');
}

function elasticTesting(request, reply) {
    eclient.index({
        index: "titleindex",
        type: "_doc",
        body: {
            title: "The Godfather",
            director: "Francis Ford Coppola",
            year: "1972"
        }
    });
    reply("Indexed");
}

async function bulkGenres(request, reply) {
    const api_key = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
    const genres = await axios.get(url);
    const genreList = genres.data.genres.map(genre => {
        return { genreId: genre.id, genre: genre.name };
    });

    const createdGenres = await db.genres.bulkCreate(genreList);
    reply(createdGenres);
}

async function bulkMovies(request, reply) {
    const api_key = process.env.TMDB_API_KEY;
    const page = request.query.page;
    const transaction = await db.sequelize.transaction();
    try {
        const movieList = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&language=en-US&page=${page}`);
        const movies = movieList.data.results;
        const moviesArr = [];
        const moviePromises = movies.map(async (movie) => {
            const movieId = movie.id;
            const title = movie.title;
            const description = movie.overview;
            const releaseDate = movie.release_date ? movie.release_date : new Date();
            const imageUrl = "https://image.tmdb.org/t/p/w500/" + (movie.poster_path ? movie.poster_path : movie.backdrop_path);
            const rating = movie.popularity;
            const genre_ids = movie.genre_ids;
            const createdMovie = db.movies.create({ movieId, title, description, releaseDate, imageUrl, rating }, { transaction, ignoreDuplicates: true });
            moviesArr.push(createdMovie);
            const genrePromises = genre_ids.map(async (genreId) => {
                return { movie_id: movieId, genre_id: genreId };
            });
            const createdGenres = db.movie_genre.bulkCreate(genrePromises, { transaction, ignoreDuplicates: true });
            const crewList = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`);
            const castPromises = crewList.data.cast.map(async (cast) => {
                const name = cast.name;
                const gender = cast.gender === 1 ? "Female" : cast.gender === 2 ? "Male" : "Other";
                const imageUrl = "https://image.tmdb.org/t/p/w500/" + cast.profile_path;
                return { name, gender, imageUrl };
            });
            const createdCasts = db.crew.bulkCreate(castPromises, { transaction, ignoreDuplicates: true });
            const actorPromises = crewList.data.cast.map(async (cast) => {
                const created_cast = await createdCasts.find(c => c.name === cast.name);
                return { personId: created_cast.personId, movieId: movieId, role: cast.character };
            });
            const createdActors = db.actors.bulkCreate(actorPromises, { transaction, ignoreDuplicates: true });
            const crewPromises = crewList.data.crew.map(async (crew) => {
                const name = crew.name;
                const gender = crew.gender === 1 ? "Female" : crew.gender === 2 ? "Male" : "Other";
                const imageUrl = "https://image.tmdb.org/t/p/w500/" + crew.profile_path;
                return { name, gender, imageUrl };
            });
            const createdCrews = db.crew.bulkCreate(crewPromises, { transaction, ignoreDuplicates: true });
            const productionCrewPromises = crewList.data.crew.map(async (crew) => {
                const created_crew = await createdCrews.find(c => c.name === crew.name);
                return { personId: created_crew.personId, movieId: movieId, role: crew.job };
            });
            const createdProductionCrews = db.productionCrew.bulkCreate(productionCrewPromises, { transaction, ignoreDuplicates: true });
            await Promise.all([createdMovie, createdGenres, createdCasts, createdActors, createdCrews, createdProductionCrews]);
        });
        await Promise.all(moviePromises);
        await transaction.commit();
        reply(moviesArr);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function BulkCrews(request, reply) {
    const movies = await db.movies.findAll({
        attributes: ['movieId'],
    });
    const api_key = process.env.TMDB_API_KEY;
    const transaction = await db.sequelize.transaction();
    try {
        const actorData = [];
        const productionCrewData = [];
        for (const movie of movies) {
            const movieId = movie.movieId;
            const crewList = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`);

            for (const cast of crewList.data.cast) {
                    const person= await db.crew.findOne({where:{name:cast.name}});
                    if(person){
                    const personId=person.personId;
                    const role=cast.character;
                    actorData.push({personId,movieId,role});}
            }
            for (const crew of crewList.data.crew) {
                const person= await db.crew.findOne({where:{name:crew.name}});
                if(person){
                const personId=person.personId;
                const role=crew.job;
                productionCrewData.push({personId,movieId,role});
                }}
            }
        await db.actors.bulkCreate(actorData,{transaction,ignoreDuplicates:true});
        await db.productionCrew.bulkCreate(productionCrewData,{transaction,ignoreDuplicates:true});

        await transaction.commit();
        reply("success");
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    apiTesting,
    elasticTesting,
    bulkGenres,
    bulkMovies,
    BulkCrews,
    BulkImages
}
async function BulkImages(request, reply) {
    const api_key = process.env.TMDB_API_KEY;
    const transaction = await db.sequelize.transaction();
    try {
        const movies=await db.movies.findAll({
            attributes: ['movieId'],
            limit: 1000,
            offset:2000
        },
            
            {transaction}
        );
        for (const movie of movies) {
            const movieId=movie.movieId;
            const imageList = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${api_key}`);
            for (const image of imageList.data.backdrops) {
                const imageUrl = "https://image.tmdb.org/t/p/w500/" + image.file_path;
                await db.images.create({ movieId, imageUrl }, { transaction, ignoreDuplicates: true });
                }}
        await transaction.commit();
        reply("success");
        }
     catch (error) {
        await transaction.rollback();
        throw error;
    }
}
module.exports = {
    apiTesting,
    elasticTesting,
    bulkGenres,
    bulkMovies,
    BulkCrews,
    BulkImages
}