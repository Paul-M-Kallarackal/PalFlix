const redis = require('redis');
const logger = require('./logConnection');
const client = redis.createClient();
(async()=>{
    client.on('error', err => logger.error('Redis Client Error', err));
    await client.connect();
        
})();

module.exports = client;