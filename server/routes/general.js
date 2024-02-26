const constants=require('../constants/constants');
const controllers = require('../controllers/index');
//Mainly for adding rows to DB and testing connections, so no validations.
 const generalRoutes = [{
      method: 'GET',
      path: `/${constants.API_VERSION}`,
      handler:controllers.generalControllers.apiTesting
    },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/elastic`,
        handler : controllers.generalControllers.elasticTesting
    },
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/bulkgenrecreation`,
        handler : controllers.generalControllers.bulkGenres
    },
    {
      method: 'GET',
      path: `/${constants.API_VERSION}/bulkmoviecreation`,
      handler : controllers.generalControllers.bulkMovies
    },
    {
      method: 'GET',
      path: `/${constants.API_VERSION}/bulkcrewcreation`,
      handler : controllers.generalControllers.BulkCrews
    },
    {
      method: 'GET',
      path: `/${constants.API_VERSION}/bulkimagecreation`,
      handler : controllers.generalControllers.BulkImages
    }
];
module.exports = generalRoutes;