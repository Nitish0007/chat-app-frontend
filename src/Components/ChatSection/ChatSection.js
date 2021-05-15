import React from "react";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

import "./ChatSection.css";
import ProfilePic from "../ProfilePic/ProfilePic";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import Input from "../InputSection/Input";

function ChatSection(props) {
  const handleClose = () => {
    <div className="chatsection"></div>;
  };

  return (
    <div className="chatsection">
      <div className="title">
        <div className="title_avatar">
          <ProfilePic height="50" width="50" />
          <span style={{ marginLeft: "0.5rem" }}>Nitish</span>
        </div>
        <IconButton onClick={handleClose}>
          <CancelIcon />
        </IconButton>
      </div>
      <MessagesContainer />
      <Input className="inputArea" />
    </div>
  );
}

export default ChatSection;
