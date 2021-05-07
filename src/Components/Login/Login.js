import React, { useRef } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import svg from "../raw-material/signIn.svg";
import SignUp from "../SignUp/SignUp";
import { Grid, TextField, Button } from "@material-ui/core";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const onsubmit = () => {
    console.log(validateEmail(email.current.value));
    // !validateEmail(email.current.value) ? " " : console.log("error");
  };

  return (
    <div className="outerContainer">
      <Grid
        className="login"
        container
        spacing={2}
        style={{ margin: "0", width: "100%" }}
      >
        <Grid className="svgBox" item xs={12} sm={5} md={5} lg={5}>
          <img className="sideSVG" src={svg} alt=" "></img>
        </Grid>
        <Grid className="loginBox" item xs={12} sm={7} md={7} lg={7}>
          <form
            className="signInForm"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submitting");
              onsubmit();
            }}
          >
            <h1 className="title">Sign In</h1>
            <div className="inputArea">
              <TextField
                inputRef={email}
                id="standard-basic"
                label="Email"
                type="text"
                placeholder="Enter your email"
                style={{ backgroundColor: "#d565fa" }}
              />
              <TextField
                inputRef={password}
                id="standard"
                label="Password"
                type="text"
                placeholder="Enter your name"
                style={{ backgroundColor: "#d565fa" }}
              />
            </div>
            <Button type="submit" variant="contained">
              Sign In
            </Button>
            <p className="newUser">
              New User?
              <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
