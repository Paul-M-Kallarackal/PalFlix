import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Grid, Pagination, Heading } from "@sparrowengg/twigs-react";
import MovieList from "./MovieList";
import { useParams } from "react-router-dom";
import axios from "axios";
import useJWT from "../hooks/useJWT";
const GenreMovies = () => {
  const token=useJWT()
  const { genreId } = useParams();
  const [url, setUrl] = React.useState(
    `genre/${genreId}/viewAllMovies?page=1&pageSize=8`,
  );
  const activePage = 1;
  const [genreName, setGenreName] = React.useState("");
  useEffect(() => {
    async function getGenreName(genreId) {
      const genreName = await axios.get(
        `http://localhost:3000/api/v1/getGenre/${genreId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGenreName(genreName.data[0].genre);
    }
    getGenreName(genreId);
  }, [genreId,token]);

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
