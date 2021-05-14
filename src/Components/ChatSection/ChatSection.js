import React from "react";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

import "./ChatSection.css";
import ProfilePic from "../ProfilePic/ProfilePic";

function ChatSection(props) {
  return (
    <div className="chatsection">
      <div className="title">
        <div className="title_avatar">
          <ProfilePic className="dp" />
          <span className="name">{props.name}</span>
        </div>
        <IconButton>
          <CancelIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatSection;
