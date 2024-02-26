const constants=require('../constants/constants');
const controllers = require('../controllers/index');
const validations = require('../validation/validation');
const genreRoutes = [
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/getGenre/{genreId}`,
        config: {
            validate: {
                params:validations.genreIdValidator,
            },
            pre:[
                {method:controllers.authControllers.validateJWT}
            ]
        }, 
        handler: controllers.genreControllers.genreDetails
    }
];
module.exports = genreRoutes;