import React from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button } from "@material-ui/core";

import "./SignUp.css";
import svg from "../raw-material/signUp.svg";

function SignUp() {
  return (
    <div className="outerContainer">
      <Grid
        className="signup"
        container
        spacing={2}
        style={{ margin: "0", width: "100%" }}
      >
        <Grid className="svgBox" item xs={12} sm={5} md={5} lg={5}>
          <img className="sideSVG" src={svg} alt=" "></img>
        </Grid>
        <Grid className="signupBox" item xs={12} sm={7} md={7} lg={7}>
          <form
            className="signUpForm"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submitting");
              onsubmit();
            }}
          >
            <h1 className="title">Sign Up</h1>
            <div className="inputArea">
              <Grid container>
                <TextField
                  id="standard-basic"
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
                  style={{ backgroundColor: "#d565fa" }}
                />
              </Grid>
              <TextField
                // inputRef={email}
                id="standard-basic"
                label="Email"
                type="text"
                placeholder="Enter email"
                style={{ backgroundColor: "#d565fa" }}
              />
              <TextField
                // inputRef={password}
                id="standard"
                label="Password"
                type="text"
                placeholder="Enter password"
                style={{ backgroundColor: "#d565fa" }}
              />
              <TextField
                // inputRef={password}
                id="standard"
                label="Confirm Password"
                type="text"
                placeholder="Confirm password"
                style={{ backgroundColor: "#d565fa" }}
              />
            </div>
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
            <p className="existingUser">
              Already Signed Up?
              <Link to="/">Sign In</Link>
            </p>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
