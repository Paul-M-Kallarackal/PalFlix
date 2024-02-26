axios = require('axios');
const db = require('./models/models');
const client = require('./utils/elasticConnection');
const logger= require('./utils/logConnection');
async function hitBackendMultipleTimes(numberOfRequests, start) {
    for (let i = start; i < numberOfRequests + start; i++) {
        try {
            // Make a request to your backend endpoint here
            await axios.get(`http://localhost:3000/api/v1/bulkmoviecreation?page=${i}`);
            // Process the response if needed
            logger.info(`Request ${i} successful`);
        } catch (error) {
            logger.error(`Request ${i} failed: ${error}`);
        }
       // Wait for 10 seconds
    }
}
async function loadIntoElasticSearch() {
    const genres = await db.genres.findAll(); // Fetch genres from the database

    for (const genre of genres) {
        try {
            await client.index({
                index: 'genres',
                type:  '_doc',
                id: genre.genreId,
                body: {
                    genre: genre.genre
                }
            });
            logger.info(`Genre ${genre.genreId} loaded into Elasticsearch`);
        } catch (error) {
            logger.error(`Failed to load genre ${genre.genreId} into Elasticsearch: ${error}`);
        }
    }
}

// loadIntoElasticSearch();
// // Example usage
// hitBackendMultipleTimes(100, 43); // Make 5 requests to the backend

// async function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function createCrewMultipleTimes() {
//     Movie_Ids = await db.movies.findAll({ attributes: ['movieId'] });
//     for (i of Movie_Ids) {
//         try {
//             await axios.get(`http://localhost:3000/api/v1/bulkcrewcreation?movie_id=${i.movieId}`);
//             await delay(1000);
//             // Process the response if needed
//             console.log(`Request ${i.movieId} successful`);
//         } catch (error) {
//             console.error(`Request ${i.movieId} failed: ${error}`);
//         }
//     }
// }

// createCrewMultipleTimes()