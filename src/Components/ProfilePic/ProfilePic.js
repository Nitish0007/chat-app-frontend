import React from "react";

import "./ProfilePic.css";

function ProfilePic(props) {
  return (
    <div className="dp">
      <img
        src="https://images.unsplash.com/photo-1611637576109-b6f76185ec9b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym95JTIwcG9zZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        alt="displayProfile"
        height={props.height}
        width={props.width}
      ></img>
    </div>
  );
}

export default ProfilePic;
