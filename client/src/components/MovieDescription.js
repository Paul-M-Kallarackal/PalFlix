import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { Heading, Link, Chip, Box, Grid, Text } from "@sparrowengg/twigs-react";
import CrewCard from "./CrewCard";
import useJWT from "../hooks/useJWT";
import callApi from "../api_wrapper/api";
const MovieDescription = () => {
  const token=useJWT()
  const { movieId } = useParams();
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [images, setImages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await callApi("get",`/movie/${movieId}`);
        setTitle(response.title);
        setDescription(response.description);
      } catch (error) {
        console.error(error);
      }
    };
    const getCrew = async () => {
      try {
        const response = await callApi("get",`/getProductionCrews/${movieId}`);
        setCrew(response);
      } catch (error) {
        console.error(error);
      }
    };
    const getImages = async () => {
      try {
        const response = await callApi("get",`/getImages/${movieId}`);
        setImages(response.map((image) => image.imageUrl));
      } catch (error) {
        console.error(error);
      }
    };
    const getGenres = async () => {
      try {
        const response = await callApi("get",`/getGenres/${movieId}`);
        setGenres(
          response.map((genre) => ({
            genre: genre.genre,
            genreId: genre.genreId,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };
    const getActors = async () => {
      try {
        const response = await callApi("get",`/getActors/${movieId}`);
        setActors(response);
      } catch (error) {
        console.error(error);
      }
    };
    getImages(movieId);
    getGenres(movieId);
    getDetails(movieId);
    getCrew(movieId);
    getActors(movieId);
  }, [movieId,token]);

  const carouselItems = Array.from({ length: 4 }, (_, index) => (
    <Carousel.Item key={index}>
      <Image
        src={images[index]}
        fluid
        style={{
          display: "block",
          margin: "auto",
          background:
            "linear-gradient(90deg, rgba(66,179,196,1) 0%, rgba(53,46,177,1) 8%, rgba(43,120,198,1) 26%, rgba(161,181,60,1) 43%, rgba(0,213,255,1) 100%)",
        }}
      />
    </Carousel.Item>
  ));

  const renderActors = () => {
    return (
      <Box css={{ display: "flex", justifyContent: "center" }}>
        {actors.map((actor) => (
          <Link key={actor.personId} href={`/actors/${actor.personId}`}>
            <CrewCard
              key={actor.personId}
              personId={actor.personId}
              name={actor.Crew.name}
              role={actor.role}
              imageUrl={actor.Crew.imageUrl}
            />
          </Link>
        ))}{" "}
      </Box>
    );
  };
  const renderProductionCrew = () => {
    return (
      <Box css={{ display: "flex", justifyContent: "center" }}>
        {crew.map((crew, index) => (
          <Link key={index} href={`/crew/${crew.Crew.personId}`}>
            <CrewCard
              key={index}
              name={crew.Crew.name}
              role={crew.role}
              imageUrl={crew.Crew.imageUrl}
            />
          </Link>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Navbar />
      <div>
        <Heading
          css={{
            textAlign: "center",
            marginTop: "20px",
            color: "white",
          }}
        >
          {title}
        </Heading>
        <Carousel indicators={false} slide={true} controls={false}>
          {carouselItems}
        </Carousel>
        <Text
          size={"h6"}
          css={{
            textAlign: "center",
            marginLeft: "120px",
            marginTop: "20px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {description}
        </Text>
        <Heading
          size={"h4"}
          css={{
            textAlign: "left",
            marginLeft: "120px",
            marginTop: "20px",
            color: "white",
          }}
        >
          Genres
        </Heading>
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginLeft: "120px",
          }}
        >
          {genres.map((genre, index) => (
            <Link key={index} href={`/genres/${genre.genreId}`}>
              <Chip
                size={"lg"}
                css={{
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "$lg",
                  fontWeight: "bold",
                  height: "40px",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                {genre.genre}
              </Chip>
            </Link>
          ))}
        </div>
        <Heading
          size={"h4"}
          css={{
            textAlign: "left",
            marginLeft: "120px",
            marginTop: "20px",
            color: "white",
          }}
        >
          Cast
        </Heading>

        {renderActors()}

        <Heading
          size={"h4"}
          css={{
            textAlign: "left",
            marginLeft: "120px",
            marginTop: "20px",
            color: "white",
          }}
        >
          Crew
        </Heading>
        <Grid gap="10" columns="repeat(auto-fill, minmax(300px, 1fr))">
          {renderProductionCrew()}
        </Grid>
      </div>
    </>
  );
};

export default MovieDescription;
