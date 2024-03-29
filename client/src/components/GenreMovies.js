import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Grid, Pagination, Heading } from "@sparrowengg/twigs-react";
import MovieList from "./MovieList";
import { useParams } from "react-router-dom";
import useJWT from "../hooks/useJWT";
import callApi from "../api_wrapper/api";
const GenreMovies = () => {
  useJWT()
  const { genreId } = useParams();
  const [url, setUrl] = React.useState(
    `genre/${genreId}/viewAllMovies?page=1&pageSize=8`,
  );
  const activePage = 1;
  const [genreName, setGenreName] = React.useState("");
  useEffect(() => {
    async function getGenreName(genreId) {
      const genreName = await callApi("get",`/genre/${genreId}`);
      setGenreName(genreName[0].genre);
    }
    getGenreName(genreId);
  }, [genreId]);

  return (
    <div>
      <Navbar />
      <Grid gap="10" columns="repeat(auto-fill, minmax(300px, 1fr))">
        <Heading
          css={{
            fontSize: "$xl",
            fontWeight: "bold",
            color: "white",
            marginBottom: "$8",
            marginLeft: "$8",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {genreName}
        </Heading>
        <Pagination
          activePage={activePage}
          onChange={(event, activePage) =>
            setUrl(
              `genre/${genreId}/viewAllMovies?page=${activePage}&pageSize=8`,
            )
          }
        />
        <MovieList url={url} />
      </Grid>
    </div>
  );
};

export default GenreMovies;
