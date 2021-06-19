import { React } from "react";
import { Divider, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import "./FriendsList.css";
import Avatar from "../Avatar/Avatar";

/*************************************************************/

function FriendsList(props) {
  return !props.friends ? (
    <div className="friendslist">
      <h3 className="head">Friends</h3>
      <Divider orientation="horizontal" className="divider" />
      <Grid container>
        <p>No Friends in the list</p>
      </Grid>
    </div>
  ) : (
    <div className="friendslist">
      <h3 className="head">Friends</h3>
      <Divider orientation="horizontal" className="divider" />
      <Grid container className="list" style={{ overflowY: "scroll" }}>
        {props.friends.map((friend, key) => (
          <li
            key={key}
            onClick={(e) => {
              props.selectedDispatch(friend, friend.conversationId);
            }}
          >
            <Avatar id={friend.uid} name={friend.name} />
          </li>
        ))}
      </Grid>
    </div>
  );
}

/******************************************************************/

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    selected: state.selected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectedDispatch: (selectedFriend, convID) => {
      dispatch({
        type: "OPEN_CHAT",
        selected: {
          name: selectedFriend.name,
          uid: selectedFriend.uid,
        },
        currentChatID: convID,
      });
    },
  };
};

/********************************************************************/

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
