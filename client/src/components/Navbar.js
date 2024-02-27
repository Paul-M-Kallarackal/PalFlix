import React from "react";
import { Text, Box, Button, Grid} from "@sparrowengg/twigs-react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
const Navbar = () => {
  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <Grid
        templateAreas="1"
        templateColumns="1"
        templateRows="1"
        width={10}
        css={{
          backgroundColor: "black",
        }}
      >
        <Box css={{ height: 100 }}>
          <Link to="/dashboard">
            <img
              src={logo}
              alt="App logo of Netflix clone"
              style={{
                paddingTop: "20px",
                width: "200px",
                height: "50 px",
                paddingLeft: "20px",
              }}
            />
          </Link>
        </Box>
        <Box css={{ height: 100 }} />
        <Box
          css={{
            backgroundColor: "black",
            height: 100,
          }}
        >
          {/* <Input
            type="text"
            placeholder="Search"
            css={{
              width: '200px',
              height: '40px',
              marginLeft: '20px',
              marginTop: '20px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid gray',
            }}
          /> */}
        <Text
          css={{
            color: "white",
            fontSize: "20px",
          }}
        >
        </Text>
        </Box>

        <Button
          onClick={Logout}
          size={"lg"}
          css={{
            backgroundColor: "#e50914",
            color: "white",
            width: "30%",
            height: "40%",
            marginLeft: "60%",
            marginTop: "5%",
          }}
        >
          Logout
        </Button>
      </Grid>
    </div>
  );
};

export default Navbar;
