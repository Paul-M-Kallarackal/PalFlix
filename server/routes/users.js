const constants=require('../constants/constants');
const controllers = require('../controllers/index');
const validations = require('../validation/validation')
const userRoutes = [
{
        method: 'GET',
        path: `/${constants.API_VERSION}/users`,
        handler: controllers.userControllers.getAllUsers,
},
{
    method: 'GET',
    path: `/${constants.API_VERSION}/users/user/{userId}`,
    config: {
        validate: {
            params:validations.userIdValidator
        }
    },
    handler: controllers.userControllers.getUserById,
},
{ 
    method: 'POST',
    path: `/${constants.API_VERSION}/register`,
    config: {
        pre: [
            {
                method: controllers.userControllers.checkUniqueUser
            },
        ],
        validate: {
            payload: validations.userValidator
        },
    },
    handler: controllers.userControllers.createAccount,
},
{
    method: 'POST',
    path: `/${constants.API_VERSION}/login`,
    config: {
        validate: {
            payload:validations.loginValidator,
        }
    },
    handler: controllers.userControllers.Login,
},
{
    method: 'PUT',
    path: `/${constants.API_VERSION}/users/user/{userId}`,
    config: {
        validate: {
            params:validations.userIdValidator
        }
    },
    handler: controllers.userControllers.updateUser,
},
{
    method: 'DELETE',
    path: `/${constants.API_VERSION}/users/user/{userId}`,
    config: {
        validate: {
            params:validations.userIdValidator
        }
    },
    handler: controllers.userControllers.deleteUser,
},
];
module.exports = userRoutes;