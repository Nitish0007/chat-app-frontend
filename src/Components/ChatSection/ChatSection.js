import React from "react";
// import { IconButton } from "@material-ui/core";
// import CancelIcon from "@material-ui/icons/Cancel";
import { connect } from "react-redux";

import "./ChatSection.css";
import ProfilePic from "../ProfilePic/ProfilePic";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import Input from "../InputSection/Input";

import svg from "../raw-material/chatsection.svg";

/**************************************************************/

function ChatSection(props) {
  // console.log(props.selected);
  return props.selected.name ? (
    <div className="chatsection">
      <div className="title">
        <div className="title_avatar">
          <ProfilePic height="50" width="50" />
          <span style={{ marginLeft: "0.5rem" }}>{props.selected.name}</span>
        </div>
      </div>
      <MessagesContainer />
      <Input className="inputArea" />
    </div>
  ) : (
    <div className="emptyChat">
      <img src={svg} alt=""></img>
      <p className="imageText">
        Select any friend from your friend list to chat.
      </p>
    </div>
  );
}

/****************************************/

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    name: state.users,
    userName: state.userName,
    uid: state.uid,
    selected: state.selected,
  };
};

/***************************************************************/

export default connect(mapStateToProps, null)(ChatSection);
