const movieRoutes = require('./movies');
const userRoutes = require('./users');
const generalRoutes = require('./general');
const genreRoutes = require('./genre');
const crewRoutes = require('./crew');
const routes=[
    ...generalRoutes,
    ...movieRoutes,
    ...userRoutes,
    ...genreRoutes,
    ...crewRoutes
];
module.exports=routes;