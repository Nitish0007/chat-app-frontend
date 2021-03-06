import React from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import "./Chat.css";
import ChatSection from "../ChatSection/ChatSection";
import FriendsList from "../FriendsList/FriendsList";
import Profile from "../Profile/Profile";
import { Redirect } from "react-router";

/*********************************************************************/

function Chat(props) {
  const localStorageData = JSON.parse(localStorage.getItem("userData"));
  if (!localStorageData) {
    return <Redirect to="/" />;
  }
  return localStorageData.auth ? (
    props.mobileView ? (
      Object.keys(props.selected).length === 0 ? (
        <div className="mainContainer">
          <Grid className="innerContainer" container>
            <Grid
              item
              className="leftsection"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Profile />
              <FriendsList />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="mainContainer">
          <Grid className="innerContainer" container>
            <Grid
              item
              className="rightsection"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <ChatSection />
            </Grid>
          </Grid>
        </div>
      )
    ) : (
      <div className="mainContainer">
        <Grid className="innerContainer" container spacing={1}>
          <Grid
            item
            className="leftsection"
            xs={12}
            sm={12}
            md={5}
            lg={4}
            xl={4}
          >
            <Profile />
            <FriendsList />
          </Grid>
          <Grid
            item
            className="rightsection"
            xs={false}
            sm={false}
            md={7}
            lg={8}
            xl={8}
          >
            <ChatSection />
          </Grid>
        </Grid>
      </div>
    )
  ) : (
    <Redirect to="/" />
  );
}

/*******************************************************************/

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
    auth: state.auth,
    selected: state.selected,
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

/******************************************************************/

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
