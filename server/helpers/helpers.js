require('dotenv').config();
const axios=require('axios');

const rateLimiter = async (request, reply) => {
    const ip = request.info.remoteAddress;
    const currentRoute = request.route.path;
    const currentMethod = request.route.method;
    const key = `${ip}:${currentRoute}:${currentMethod}`;
    console.log(key);
    const currentCount = await client.get(key);
    if (currentCount === null) {
        client.set(key, 1, 'EX', 60);
        return reply(true);
    } else {
        if (parseInt(currentCount) >= 5) {
            return reply.response('You have reached the maximum number of requests').code(429).takeover();
        } else {
            client.incr(key);
            return reply(true);
        }
    }   
}
  
async function checkJWTtoken(request, reply) {
    try {
            let token=request.state.token;
            console.log(jwt.verify(token, process.env.SECRET_KEY))
            if(jwt.verify(token, process.env.SECRET_KEY)){
            return reply.continue();}
            else{
                throw Boom.unauthorized("Unauthorized");
            }
     
    } catch (error) {
        if(error.name==="JsonWebTokenError") {
            return reply(Boom.unauthorized("Unauthorized"));
        }
        return reply(error);
    }
  }
//Needs rework


  
  // bulkCreateContents(process.env.TMDB_API_KEY, 1);
  // bulkCreateContents(process.env.TMDB_API_KEY, 2);
  // bulkCreateContents(process.env.TMDB_API_KEY, 3);
  // bulkCreateContents(process.env.TMDB_API_KEY, 4);
  // bulkCreateContents(process.env.TMDB_API_KEY, 5);
  // bulkCreateContents(process.env.TMDB_API_KEY, 6);
  // bulkCreateContents(process.env.TMDB_API_KEY, 7);
  // bulkCreateContents(process.env.TMDB_API_KEY, 8);
  
  module.exports = {
    checkJWTtoken,
    rateLimiter
  };
  
