const db = require('../models/models');
// const  client  = require('../utils/elasticConnection');
// async function moviePagination(request, reply) {
//   try {
//     const page = parseInt(request.query.page);
//     const pageSize = parseInt(request.query.pageSize);
//     const offset = (page - 1) * pageSize;

//     const { body } = await client.search({
//       index: 'movieindex',
//       body: {
//         query: {
//           match_all: {}
//         },
//         from: offset,
//         size: pageSize
//       }
//     });
//     let movies = body.hits.hits.map(hit => hit._source);
//     if (movies.length === 0) {
//       movies = await db.movies.findAll({
//         offset,
//         limit: pageSize
//       });
//     }

//     reply(movies);
//   } catch (error) {
//     console.error('Error populating movies:', error);
//     reply([]);
//   }
// }

//Rewrite function such that can be incorporated into finding the movies by genre
async function movieList(request, reply) {
  try {
    const name = request.params.name;
    const page = parseInt(request.query.page);
    const pageSize = parseInt(request.query.pageSize);  
    const offset = (page - 1) * pageSize;
    let movies;
    switch (name) {
      case 'LatestMovies':
        movies = await db.movies.findAll({
          order: [['releaseDate', 'DESC']],
          limit: 4
        });
        break;
      case 'TopRated':
        movies = await db.movies.findAll({
          order: [['rating', 'DESC']],
          limit: 4
        });
        break;
      case 'RomanceGenre':
        movies = await db.movies.findAll({
          include: [{
            model: db.genres,
            through: 'movie_genres',
            where: {
              genre: 'Romance'
            }
          }],
          limit: 4
        });
        break;
      case 'RecommendedMovies':
        movies = await db.movies.findAll({
          order: db.sequelize.random(),
          limit: 4
        });
        break;
      case 'fullLatestMovies':
        movies = await db.movies.findAll({
          order: [['releaseDate', 'DESC']],
          offset,
          limit: pageSize
        });
        break;
      case 'fullTopRated':
        movies = await db.movies.findAll({
          order: [['rating', 'DESC']],
          offset,
          limit: pageSize
        });
        break;
      case 'fullRomanceGenre':
        movies = await db.movies.findAll({
          include: [{
            model: db.genres,
            through: 'movie_genres',
            where: {
              genre: 'Romance'
            }
          }],
          offset,
          limit: pageSize
        });
        break;
      case 'fullRecommendedMovies':
        movies = await db.movies.findAll({
          order: db.sequelize.random(),
          offset,
          limit: pageSize
        });
        break;

      
      default:
        movies = [];
        break;
      
    }
    reply(movies);
  } catch (error) {
    console.error('Error populating movies:', error);
    reply([]);
  }
}

async function movieImages(request, reply) {
  try {
    const movieId = request.params.movieId;
    const images=await db.images.findAll({
      where:{
        movieId
      },
      limit: 4
    });
    reply(images);
  } catch (error) {
    console.error('Error populating movie images:', error);
    reply([]);
  }
}

async function movieDetails(request, reply) {
  try {
    const movieId = request.params.movieId;
    const movie=await db.movies.findOne({
      where:{
        movieId
      }
    });
    reply(movie);
  } catch (error) {
    console.error('Error populating movie details:', error);
    reply([]);
  }
}
async function movieCastDetails(request, reply) {
  try {
    const movieId = request.params.movieId;
    const actors = await db.actors.findAll({
      include: [{
        model: db.crew,
      }],
      where: {
        movieId
      },
      limit: 3
    });
    reply(actors);
  } catch (error) {
    console.error('Error populating movie details:', error);
    reply([]);
  }
}
async function movieProductionCrewDetails(request, reply) {
  try {
    const movieId = request.params.movieId;
    const productionCrew=await db.productionCrew.findAll({
      include: [{
          model: db.crew,
        }],
      where:{
          movieId
      },
      limit: 3
    });
    reply(productionCrew);
  } catch (error) {
    console.error('Error populating movie details:', error);
    reply([]);
  }
}

async function movieGenreDetails(request, reply) {
  try {
    const movieId = request.params.movieId;
    const genres=await db.genres.findAll({
      include: [{
          model: db.movies,
          through: 'movie_genres',
          where: {
              movieId
          }
      }]
    });
    reply(genres);
  } catch (error) {
    console.error('Error populating movie details:', error);
    reply([]);
  }
}
async function viewAllMoviesByGenre(request, reply) {
   try {
    const page = parseInt(request.query.page);
    const pageSize = parseInt(request.query.pageSize);  
    const offset = (page - 1) * pageSize;
    const genreId = request.params.genreId;
    const movies=await db.movies.findAll({
      include: [{
          model: db.genres,
          through: 'movie_genres',
          where: {
              genreId
          },
      }],
      limit: pageSize,
      offset
    });
    reply(movies);
  }
  catch (error) {
    console.error('Error populating movie details:', error);
    reply([]);
  }
}
async function latestMovies(request, reply) {
  try {
    const page=request.query.page;
    const pageSize=request.query.pageSize;
    const offset=(page - 1) * pageSize;
    const movies = await db.movies.findAll({
      order: [['releaseDate', 'DESC']],
      limit: pageSize,
      offset

    });
    reply(movies);
  } catch (error) {
    console.error('Error populating movies:', error);
    reply([]);
  }
}
async function topRatedMovies(request, reply) {
  try {
    const page=request.query.page;
    const pageSize=request.query.pageSize;
    const offset=(page - 1) * pageSize;
    const movies = await db.movies.findAll({
      order: [['rating', 'DESC']],
      limit: pageSize,
      offset
    });
    reply(movies);
  } catch (error) {
    console.error('Error populating movies:', error);
    reply([]);
  }
}
module.exports = {
  // moviePagination,
  movieList,
  movieImages,
  movieDetails,
  movieCastDetails,
  movieProductionCrewDetails,
  movieGenreDetails,
  viewAllMoviesByGenre,
  latestMovies,
  topRatedMovies
};