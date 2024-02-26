import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Grid, Heading, Pagination } from "@sparrowengg/twigs-react";
import MovieList from "./MovieList";
import useJWT from "../hooks/useJWT";
const SpecialMovies = () => {
  useJWT()
  let displayName;
  const { movieType } = useParams();
  const [url, setUrl] = React.useState(`movies/${movieType}?page=1&pageSize=8`);
  const activePage = 1;
  if (movieType === "latestMovies") {
    displayName = "Latest Movies";
  } else if (movieType === "topRated") {
    displayName = "Top Rated Movies";
  } else if (movieType === "recommendedMovies") {
    displayName = "Recommended Movies";
  }

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
          {displayName}
        </Heading>
        <Pagination
          activePage={activePage}
          onChange={(event, activePage) =>
            setUrl(`movies/${movieType}?page=${activePage}&pageSize=8`)
          }
        />
        <MovieList url={url} />
      </Grid>
    </div>
  );
};

export default SpecialMovies;
