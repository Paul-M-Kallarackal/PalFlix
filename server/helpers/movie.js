const { Client } = require('@elastic/elasticsearch');
async function ingestData(movieData, moviegenresData) {
    const client = new Client({ node: 'http://localhost:9200' });

    try {
        // Index movie data
        await client.bulk({
            index: 'movies',
            type: '_doc',
            body: movieData.flatMap((movie) => [
                { index: { _index: 'movies' } },
                movie
            ])
        });


        // Index connector data
        await client.bulk({
            index: 'movie_genre',
            type: '_doc',
            body: moviegenresData.flatMap((connector) => [
                { index: { _index: 'movie_genre' } },
                connector
            ])
        });

        console.log('Data ingested successfully into Elasticsearch.');
    } catch (error) {
        console.error('Error ingesting data into Elasticsearch:', error);
    }
}

module.exports = {
    ingestData
};
const movieData = [
    {   movie_id: 1,
        title: "Movie 1",
        description: "Description of Movie 1",
        release_date: "2022-01-01",
        image_url: "https://example.com/movie1.jpg"
    },
    {
        title: "Movie 2",
        description: "Description of Movie 2",
        release_date: "2022-02-15",
        image_url: "https://example.com/movie2.jpg"
    },
];

const moviegenresData = [
    { movie_id: 1, genre: "Action" },
    { movie_id: 1, genre: "Adventure" },
    { movie_id: 2, genre: "Comedy" },
    { movie_id: 2, genre: "Romance" },
    { movie_id: 2, genre: "Drama" },
];

ingestData(movieData, moviegenresData);
