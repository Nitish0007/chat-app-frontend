import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Chat from "./Components/Chat/Chat";

let timer;
function App(props) {
  // const [isMobileView, setMobileView] = useState(false);

  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      props.mobileViewAction(window.innerWidth < 960);
    }, 700);
  };

  window.addEventListener("resize", debounce);

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
