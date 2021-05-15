import React from "react";
import { Divider, Grid } from "@material-ui/core";

import "./FriendsList.css";
import Avatar from "../Avatar/Avatar";

function FriendsList() {
  return (
    <div className="friendslist">
      <h3 className="head">Friends</h3>
      <Divider orientation="horizontal" className="divider" />
      <Grid container>
        <Avatar name="nitish" />
      </Grid>
    </div>
  );
}

export default FriendsList;
