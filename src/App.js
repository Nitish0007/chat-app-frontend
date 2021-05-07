import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Login} exact>
          <Login />
        </Route>
        <Route path="/signup" component={SignUp}>
          <SignUp />
        </Route>
      </Router>
    </div>
  );
}

export default App;
