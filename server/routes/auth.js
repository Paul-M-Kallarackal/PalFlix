
const controllers = require('../controllers/index');
const constants = require('../constants/constants');
const authRoutes = [
    {
        method: 'GET',
        path: `/${constants.API_VERSION}/auth/validate`,
        handler: controllers.authControllers.validateJWT
    }
];
module.exports = authRoutes;