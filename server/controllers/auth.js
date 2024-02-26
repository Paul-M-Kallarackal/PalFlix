const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
const validateJWT = (request, reply) => {
    try {
        let token=request.headers.authorization.split(' ')[1];
        if( jwt.verify(token, process.env.SECRET_KEY)){
            return reply.continue();
        }
        else{
            throw Boom.unauthorized("Unauthorized");
        }
 
} catch (error) {
    if(error.name==="JsonWebTokenError") {
        return reply(Boom.unauthorized("Unauthorized"));
    }
    return reply(error);
}
};
module.exports = {
    validateJWT
};

