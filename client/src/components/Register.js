import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import axios from "axios";
import {
  Box,
  ThemeProvider,
  Heading,
  Button,
  Grid,
  FormInput,
  Text,
} from "@sparrowengg/twigs-react";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    axios
      .post("http://localhost:3000/api/v1/register", formData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "An error occurred");
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
        <ToastContainer />
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
        <Box css={{ justifyContent: "center" }}>
          <Heading
            size={"h2"}
            css={{ color: "white", marginBottom: "20px", textAlign: "center" }}
          >
            Sign Up
          </Heading>
          <FormInput
            placeholder="Username"
            css={{ marginBottom: "10px", width: "100%" }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            placeholder="Email"
            css={{ marginBottom: "10px", width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            variant={"solid"}
            size={"lg"}
            css={{ backgroundColor: "#e50914", color: "white", width: "100%" }}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Text
            css={{
              color: "white",
              marginTop: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Have an Account?{" "}
            <a href="/" style={{ color: "white" }}>
              Login.
            </a>
          </Text>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
