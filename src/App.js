import React, { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";

import "./App.css";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Chat from "./Components/Chat/Chat";

const socket = io.connect('https://react-project-chat-app.herokuapp.com/');
console.log(socket);

let timer;

function App(props) {
  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      props.mobileViewAction(window.innerWidth < 700);
    }, 700);
  };

  window.addEventListener("resize", debounce);

  const localStorageData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    props.setSocket(socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (!localStorageData) {
      <Redirect to="/" />;
      return;
    } else {
      props.onRefresh(localStorageData);
    }
  }, [localStorageData, props]);

  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mobileViewAction: (view) =>
      dispatch({
        type: "MOBILEVIEW",
        mobileView: view,
      }),
    onRefresh: (data) =>
      dispatch({
        type: "IS_LOGGED_IN",
        auth: data.auth,
        name: data.user.name,
        uid: data.user.uid,
        userName: data.user.username,
        friends: data.user.friends,
        messages: data.user.messages,
      }),
    setSocket: (socket) => {
      dispatch({
        type: "SET_SOCKET",
        socket: socket,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
