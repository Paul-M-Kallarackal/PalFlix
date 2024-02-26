import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Grid, Box } from "@sparrowengg/twigs-react";

const MovieList = ({ url }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/${url}`);
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getMovies();
  }, [url]);

  const renderMovieCards = () => {
    const moviesChunks = Array.from(
      { length: Math.ceil(movies.length / 4) },
      (_, index) => movies.slice(index * 4, index * 4 + 4),
    );

    return moviesChunks.map((chunk, index) => (
      <Box key={index} css={{ display: "flex", justifyContent: "center" }}>
        {chunk.map((movie) => (
          <MovieCard key={movie.movieId} {...movie} />
        ))}
      </Box>
    ));
  };

  return (
    <div>
      <Grid gap="10" columns="repeat(auto-fill, minmax(300px, 1fr))">
        {renderMovieCards()}
      </Grid>
    </div>
  );
};

export default MovieList;
