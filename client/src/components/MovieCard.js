import React from "react";
import moment from "moment";
import {
  Box,
  Heading,
  Text,
  Flex,
  Chip,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@sparrowengg/twigs-react";
import { Link } from "react-router-dom";
const MovieCard = ({ movieId, title, description, releaseDate, imageUrl }) => {
  releaseDate=moment(releaseDate).format("YYYY-MM-DD");
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
        <Box
        css={{
          backgroundImage: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.7)
    ),url(${imageUrl})`,
          width: 300,
          height: 300,
          backgroundSize: "cover",
          borderRadius: "$xl",
          position: "relative",
          marginBottom: "$8",
          marginLeft: "$8",
        }}>
        </Box>
          </DialogTrigger>
          <DialogContent>
          <Box
                  css={{
                    margin: "auto",
                    width: 300,
                    height: 300,
                    borderRadius: "$xl",
                    backgroundSize: "cover",
                    position: "relative",
                    backgroundImage: `url(${imageUrl})`,
                  }}
                ></Box>
                <Box
                  css={{
                    position: "relative",
                    bottom: 0,
                    left: 0,
                    padding: "$8",
                  }}
                >
                  <Heading
                    size="h3"
                    css={{
                      marginBottom: 0,
                      color: "$black900",
                    }}
                  >
                    {title}
                  </Heading>
                  <Text
                    css={{
                      color: "$black800",
                      marginBottom: "$4",
                    }}
                  >
                    {" "}
                    {description}{" "}
                  </Text>
                  <Chip>Released on : {releaseDate} </Chip>
                  <Flex gap="$4">
                    <Button
                      css={{
                        backgroundColor: "$black900",
                        position: "relative",
                        color: "$white900",
                        marginTop: "$8",
                        width: "50%",
                        height: "40px",
                        "&:hover": {
                          backgroundColor: "$black800",
                        },
                      }}
                    >
                      <Link to={"/title/" + movieId}
                                      style={{
                                        color: "white",
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        textDecoration: "none",
                                        padding : "10px",
                                      }}>View Details</Link>
                    </Button>
                  </Flex>
                </Box>
                <Box
          css={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: "$8",
          }}
        >
        </Box>
          </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieCard;
