const Joi = require('joi');

// module.exports.genreValidator = Joi.object( {
//     genre: Joi.string().required()
// }).required('Payload is required').description('Payload is very important');

// module.exports.movieValidator = Joi.object( {
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     releaseDate: Joi.date().required(),
//     image_url: Joi.string().required(),
//     genreId: Joi.number().required()
// }).required('Payload is required').description('Payload is very important');

const userValidator = Joi.object( {
        username: Joi.string().alphanum().min(6).max(10).required(),
        email: Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        password: Joi.string().min(8).required(),
        isServiceUser: Joi.boolean().default(false) 
    
}).required('Payload is required').description('Payload is very important');

const loginValidator = Joi.object( {
    email: Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
    password: Joi.string().min(8).required(),
}).required('Payload is required').description('Payload is very important');

const userIdValidator = Joi.object( {
        userId: Joi.number().integer().positive().required()
        }).required('Payload is required').description('Payload is very important');

const genreIdValidator = Joi.object( {
        genreId: Joi.number().integer().positive().required()
        }).required('Payload is required').description('Payload is very important');

const movieIdValidator = Joi.object( {
        movieId: Joi.number().integer().positive().required()
        }).required('Payload is required').description('Payload is very important');

const productionCrewIdValidator = Joi.object( {
        productionCrewId: Joi.number().integer().positive().required()
        }).required('Payload is required').description('Payload is very important');

const actorIdValidator = Joi.object( {
        actorId: Joi.number().integer().positive().required()
        }).required('Payload is required').description('Payload is very important');


const pageValidator = Joi.object( {
        page: Joi.number().integer().positive().required(),
        pageSize: Joi.number().integer().positive().required()
        }).required('Payload is required').description('Payload is very important');

module.exports={
        userValidator,
        loginValidator,
        userIdValidator,
        genreIdValidator,
        movieIdValidator,
        productionCrewIdValidator,
        actorIdValidator,
        pageValidator
}