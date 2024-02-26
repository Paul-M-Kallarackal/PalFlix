const movieRoutes = require('./movies');
const userRoutes = require('./users');
const generalRoutes = require('./general');
const genreRoutes = require('./genre');
const crewRoutes = require('./crew');
const authRoutes = require('./auth');

const routes=[
    ...generalRoutes,
    ...movieRoutes,
    ...userRoutes,
    ...genreRoutes,
    ...crewRoutes,
    ...authRoutes
];
module.exports=routes;

