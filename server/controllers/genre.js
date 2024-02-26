const  client  = require('../utils/elasticConnection');
async function genreDetails(request, reply) {
  try {
    const genreId = request.params.genreId;
    const { body } = await client.search({
      index: 'genres',
      body: {
        query: {
          match: {
            _id: genreId
          }
        }
      }
    });
    const genre = body.hits.hits.map(hit => hit._source);
    reply(genre);
  } catch (error) {
    console.error('Error fetching genre:', error);
    reply([]);
  }
}
module.exports = {
    genreDetails
    };
