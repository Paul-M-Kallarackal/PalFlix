import React from "react";
import Navbar from "./Navbar";
import UserGreeting from "./UserGreeting";
import { Grid, Box, Heading } from "@sparrowengg/twigs-react";
import MovieList from "./MovieList";
import { Link } from "react-router-dom";
const Dashboard = () => {

  const MovieCarousels = [
    {
      name: "LatestMovies",
      displayname: "Latest Movies",
      page: 1,
      pageSize: 4,
      url: "movies/latestMovies?page=1&pageSize=4",
      fullLink: "/movies/latestMovies",
    },
    {
      name: "RomanceGenre",
      displayname: "Romance Genre",
      page: 1,
      pageSize: 4,
      url: "genre/10749/viewAllMovies?page=1&pageSize=4",
      fullLink: "/genres/10749",
    },
    {
      name: "RecommendedMovies",
      displayname: "Recommended for you",
      page: 1,
      pageSize: 4,
      url: "movies/topRated?page=1&pageSize=4",
      fullLink: "/movies/topRated",
    },
    {
      name: "TopRated",
      displayname: "Top Rated",
      page: 1,
      pageSize: 4,
      url: "movies/topRated?page=1&pageSize=4",
      fullLink: "/movies/topRated",
    },
  ];

  return (
    <div>
      <Navbar />
      <Grid gap="10" columns="repeat(auto-fill, minmax(300px, 1fr))">
      <UserGreeting/>
        {MovieCarousels.map((carousel, index) => (
          <React.Fragment key={index}>
            <Box
              css={{
                display: "flex",
                justifyContent: "left",
                paddingLeft: 120,
              }}
            >
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
                {carousel.displayname}
              </Heading>
            </Box>
            <Box
              css={{
                display: "flex",
                justifyContent: "right",
                paddingRight: 200,
              }}
            >
              <Link
                to={carousel.fullLink}
                size={"lg"}
                css={{
                  color: "white",
                  fontSize: "$lg",
                  fontWeight: "bold",
                  height: "40px",
                }}
              >
                View All
              </Link>
            </Box>
            <MovieList
              url={carousel.url}
              page={carousel.page}
              pageSize={carousel.pageSize}
            />
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
