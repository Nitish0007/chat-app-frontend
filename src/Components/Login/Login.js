import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
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

/*********************************************************************/

const Login = (props) => {
  const [fieldError, setFieldError] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const usernameref = useRef();
  const passref = useRef();
  const [visiblity, setVisiblity] = useState(false);
  const handleClickShowPassword = () => {
    setVisiblity(!visiblity);
  };

  /*******************************************************************/

  const onsubmit = () => {
    fetch(`${process.env.REACT_APP_SERVER}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: usernameref.current.value,
        password: passref.current.value,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!data.status) {
          alert(data.message);
          return;
        } else {
          props.isLoggedIn(data);
          localStorage.setItem("userData", JSON.stringify(data));
          history.push("/chat");
        }
      })
      .catch((err) => {
        console.log("Can't log In", err);
      });
  };

  /****************************************************************/

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
                inputRef={usernameref}
                id="standard-basic"
                label="Username"
                type="text"
                error={fieldError.username === "" ? false : true}
                helperText={fieldError.username}
                onBlur={(e) => {
                  const myfieldError = { ...fieldError };
                  if (e.target.value) {
                    myfieldError.username = "";
                    setFieldError(myfieldError);
                  } else {
                    myfieldError.username = "Username field can't be empty";
                    setFieldError(myfieldError);
                  }
                }}
                placeholder="Enter Username"
                style={{ backgroundColor: "#d565fa" }}
              />

              <TextField
                autoComplete="off"
                inputRef={passref}
                id="standard"
                label="Password"
                type={visiblity ? "text" : "password"}
                error={fieldError.password === "" ? false : true}
                helperText={fieldError.password}
                onBlur={(e) => {
                  const myfieldError = { ...fieldError };
                  if (e.target.value) {
                    myfieldError.password = "";
                    setFieldError(myfieldError);
                  } else {
                    myfieldError.password = "password field can't be empty";
                    setFieldError(myfieldError);
                  }
                }}
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
                placeholder="Enter password"
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
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

/*****************************************************************/

const mapStateToProps = (state) => {
  return {
    uid: state.uid,
    socket: state.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: (data) =>
      dispatch({
        type: "IS_LOGGED_IN",
        auth: data.auth,
        name: data.user.name,
        uid: data.user.uid,
        userName: data.user.username,
        friends: data.user.friends,
        messages: data.user.messages,
        rooms: data.user.friends.chatrooms,
      }),
    setSocket: (socket) =>
      dispatch({
        type: "SET_SOCKET",
        socket: socket,
      }),
  };
};

/*****************************************************************/

export default connect(mapStateToProps, mapDispatchToProps)(Login);
