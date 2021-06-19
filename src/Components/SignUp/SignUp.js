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

/*********************************************************************/

function SignUp() {
  const nameref = useRef();
  const usernameref = useRef();
  const passref = useRef();
  const confirmpassref = useRef();
  const [fieldError, setFieldError] = useState({
    name: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [visiblity, setVisiblity] = useState(false);
  const [confirmVisiblity, setConfirmVisiblity] = useState(false);

  const setNull = () => {
    nameref.current.value = null;
    usernameref.current.value = null;
    passref.current.value = null;
    confirmpassref.current.value = null;
  };

  const onsubmit = (e) => {
    fetch(`${process.env.REACT_APP_SERVER}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameref.current.value,
        userName: usernameref.current.value,
        password: passref.current.value,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!data.status) {
          setNull();
          alert(data.message);
          return;
        } else {
          alert(data.message);
          e.target.reset();
        }
      })
      .catch((err) => console.log("Not signedUp", err));
  };

  /*******************************************************/

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
              onsubmit(e);
            }}
          >
            <h1 className="title">Sign Up</h1>
            <div className="inputArea">
              <Grid container>
                <TextField
                  id="standard-basic"
                  inputRef={nameref}
                  label="Name"
                  type="text"
                  error={fieldError.name ? true : false}
                  helperText={fieldError.name}
                  onBlur={(e) => {
                    const myfieldError = { ...fieldError };
                    if (!e.target.value) {
                      myfieldError.name = "field can't be empty";
                      setFieldError(myfieldError);
                    } else {
                      myfieldError.name = "";
                      setFieldError(myfieldError);
                    }
                  }}
                  placeholder="Enter your name"
                  style={{ backgroundColor: "#d565fa" }}
                />
              </Grid>
              <TextField
                inputRef={usernameref}
                id="standard-basic"
                label="Username"
                type="text"
                error={fieldError.username ? true : false}
                helperText={fieldError.username}
                onBlur={(e) => {
                  const myfieldError = { ...fieldError };
                  if (!e.target.value) {
                    myfieldError.username = "field can't be empty";
                    setFieldError(myfieldError);
                  } else {
                    myfieldError.username = "";
                    setFieldError(myfieldError);
                  }
                }}
                placeholder="Enter username"
                style={{ backgroundColor: "#d565fa" }}
              />
              <TextField
                inputRef={passref}
                id="standard"
                label="Password"
                type={visiblity ? "text" : "password"}
                placeholder="Enter password"
                error={fieldError.password ? true : false}
                helperText={fieldError.password}
                onBlur={(e) => {
                  const myfieldError = { ...fieldError };
                  if (
                    e.target.value.length < 6 &&
                    e.target.value.length !== 0
                  ) {
                    myfieldError.password = "password must contain 6 character";
                    setFieldError(myfieldError);
                  } else if (!e.target.value) {
                    myfieldError.password = "field can't be empty";
                    setFieldError(myfieldError);
                  } else {
                    myfieldError.password = "";
                    setFieldError(myfieldError);
                  }
                }}
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
                inputRef={confirmpassref}
                id="standard"
                label="Confirm Password"
                type={confirmVisiblity ? "text" : "password"}
                placeholder="Confirm password"
                error={fieldError.confirmpass ? true : false}
                helperText={fieldError.confirmpass}
                onBlur={(e) => {
                  const myfieldError = { ...fieldError };
                  if (e.target.value) {
                    myfieldError.confirmpass = "";
                    setFieldError(myfieldError);
                  } else if (e.target.value !== passref.current.value) {
                    myfieldError.confirmpass = "password not confirmed";
                    setFieldError(myfieldError);
                  } else if (!e.target.value) {
                    myfieldError.confirmpass = "field can't be empty";
                    setFieldError(myfieldError);
                  } else {
                    nameref.current.value = "";
                    usernameref.current.value = "";
                    passref.current.value = "";
                    confirmpassref.current.value = "";
                  }
                }}
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
