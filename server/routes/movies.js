const constants=require('../constants/constants');
const controllers=require('../controllers/index');
const validations=require('../validation/validation');
const helpers=require('../helpers/helpers');
 const movieRoutes = [
    // {
    //     method: 'GET',
    //     path: `/${constants.API_VERSION}/getMovies`,
    //     handler: controllers.movieControllers.moviePagination
    // },
    // {
    //     method: 'GET',
    //     path: `/${constants.API_VERSION}/getMovies/{name}`,
    //     handler: controllers.movieControllers.movieList
    // },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/getImages/{movieId}`,
        config: {
            validate: {
                params:validations.movieIdValidator
            },
            pre: [
                // helpers.rateLimiter,
                {method:controllers.authControllers.validateJWT}
            ]
        },
        handler: controllers.movieControllers.movieImages
    },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/getDetails/{movieId}`,
        config: {
            validate: {
                params:validations.movieIdValidator
            },
            pre:[
                {method:controllers.authControllers.validateJWT}
            ]
        },
        handler: controllers.movieControllers.movieDetails
    },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/getActors/{movieId}`,
        config: {
            validate: {
                params:validations.movieIdValidator
            },
            pre:[
                {method:controllers.authControllers.validateJWT}
            ]
        },
        handler: controllers.movieControllers.movieCastDetails
    },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/getProductionCrews/{movieId}`,
        config: {
            validate: {
                params:validations.movieIdValidator
            },
            pre:[
                {method:controllers.authControllers.validateJWT}
            ]
        },
        handler: controllers.movieControllers.movieProductionCrewDetails
    }
    ,{
        method: 'GET',
        path: `/${constants.API_VERSION}/getGenres/{movieId}`,
        config: {
            validate: {
                params:validations.movieIdValidator
            },
            pre:[
                {method:controllers.authControllers.validateJWT}
            ]
        },
        handler: controllers.movieControllers.movieGenreDetails
    },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/genre/{genreId}/viewAllMovies`,
        config: {
            validate: {
                params:validations.genreIdValidator
            },
            pre:[
                {method:controllers.authControllers.validateJWT}
            ]
        },
        handler: controllers.movieControllers.viewAllMoviesByGenre
    },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/movies/latestMovies`,
        config: {
            validate: {
                query:validations.pageValidator
            },
            pre:[
                {method:controllers.authControllers.validateJWT}
            ]
        },
        handler: controllers.movieControllers.latestMovies
    },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/movies/topRated`,
        config: {
            validate: {
                query:validations.pageValidator
            },
            pre:[
                {method:controllers.authControllers.validateJWT}
            ]
        },
        handler: controllers.movieControllers.topRatedMovies
    }

];
module.exports = movieRoutes;
