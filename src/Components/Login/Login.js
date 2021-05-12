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

import "./Login.css";
import svg from "../raw-material/signIn.svg";

const Login = () => {
  const email = useRef();
  const passRef = useRef();
  const [visiblity, setVisiblity] = useState(false);

  const handleClickShowPassword = () => {
    setVisiblity(!visiblity);
  };

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const onsubmit = () => {
    console.log(validateEmail(email.current.value));
    const filled = validateEmail(email.current.value);

    if (filled) {
      return null;
    } else {
      console.log("email is not correct");
    }
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
                helperText={
                  email.value === " " ? "Email field can't be empty" : ""
                }
                placeholder="Enter your email"
                style={{ backgroundColor: "#d565fa" }}
              />

              <TextField
                autoComplete="off"
                inputRef={passRef}
                id="standard"
                label="Password"
                type={visiblity ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {visiblity ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your name"
                style={{ backgroundColor: "#d565fa", width: "12.2rem" }}
              />
            </div>

            <Button type="submit" variant="contained">
              Sign In
            </Button>

            <p className="newUser">
              New User?
              <Link to="/signup">Sign Up</Link>
            </p>

            {/* temp link */}
            <p>
              <Link to="/chat">Chatpage</Link>
            </p>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
