import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import "./SignUp.css";
import svg from "../raw-material/signUp.svg";

function SignUp() {
  const email = useRef();
  const passRef = useRef();
  const ConfirmpassRef = useRef();

  const [visiblity, setVisiblity] = useState(false);
  const [confirmVisiblity, setConfirmVisiblity] = useState(false);

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
              validateEmail(email);
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
                inputRef={email}
                id="standard-basic"
                label="Email"
                type="text"
                placeholder="Enter email"
                style={{ backgroundColor: "#d565fa" }}
              />
              <TextField
                inputRef={passRef}
                id="standard"
                label="Password"
                type={visiblity ? "text" : "password"}
                placeholder="Enter password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => setVisiblity(!visiblity)}
                      >
                        {visiblity ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{ backgroundColor: "#d565fa", width: "12.2rem" }}
              />
              <TextField
                inputRef={ConfirmpassRef}
                id="standard"
                label="Confirm Password"
                type={confirmVisiblity ? "text" : "password"}
                placeholder="Confirm password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => setConfirmVisiblity(!confirmVisiblity)}
                      >
                        {confirmVisiblity ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{ backgroundColor: "#d565fa", width: "12.2rem" }}
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
