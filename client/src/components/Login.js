import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../userActions";
import {
  Box,
  ThemeProvider,
  Heading,
  Button,
  Grid,
  FormInput,
  Text,
} from "@sparrowengg/twigs-react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/Logo.png";
import "react-toastify/dist/ReactToastify.css";
import callApi from "../api_wrapper/api";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    callApi("post", "/login", { email, password })
      .then((response) => {
          const token = response.data.token;
          if(token){
          localStorage.setItem("token", token);
          dispatch(setUserDetails(response.data.user));
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error("Invalid credentials, Please try again!");
      });
  };

  return (
    <ThemeProvider>
      <Box css={{ height: "100px" }}>
        <img
          src={logo}
          alt="App logo of Netflix clone"
          style={{ paddingTop: "20px", width: "200px", height: "75px" }}
        />
      </Box>
      <Grid
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backdropFilter: "blur(6px)",
          margin: "0px 300px",
        }}
      >
        <ToastContainer />
        <Box css={{ justifyContent: "center" }}>
          <Heading
            size={"h2"}
            css={{ color: "white", marginBottom: "20px", textAlign: "center" }}
          >
            Login
          </Heading>
          <FormInput
            placeholder="Email"
            css={{ marginBottom: "10px", width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <FormInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            variant={"solid"}
            size={"lg"}
            css={{ backgroundColor: "#e50914", color: "white", width: "100%" }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Text
            css={{
              color: "white",
              marginTop: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            New to Palflix? &nbsp;
            <a href="/register" style={{ color: "white" }}>
              Sign up now.
            </a>
          </Text>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
