const constants=require('../constants/constants');
const controllers = require('../controllers/index');
const validations = require('../validation/validation');
const crewRoutes = [
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/actors/{actorId}`,
        config:{
            validate:{
                params:validations.actorIdValidator
            }
        },
        handler: controllers.crewControllers.actorDetails
    },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/actors/{actorId}/getMovies`,
        config:{
            validate:{
                params:validations.actorIdValidator
            }
        },
        handler: controllers.crewControllers.actorMovies
    },
    {
        method:'GET',
        path:`/${constants.API_VERSION}/crew/{productionCrewId}`,
        config:{
            validate:{
                params: validations.productionCrewIdValidator
            }
        },
        handler:controllers.crewControllers.productionCrewDetails
    },
    {
        method:'GET',
        path:`/${constants.API_VERSION}/crew/{productionCrewId}/getMovies`,
        config:{
            validate:{
                params: validations.productionCrewIdValidator
            }
        },
        handler:controllers.crewControllers.productionCrewMovies
    }
];
module.exports = crewRoutes;