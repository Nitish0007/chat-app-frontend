import React from "react";

import "./Avatar.css";
import ProfilePic from "../ProfilePic/ProfilePic";

function Avatar(props) {
  return (
    <div className="avatar">
      <ProfilePic height="40" width="40" />
      <span className="userName">{props.name}</span>
    </div>
  );
}

export default Avatar;
