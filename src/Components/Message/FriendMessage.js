import React, { forwardRef } from "react";

import "./FriendMessage.css";

const FreindMessage = forwardRef((props, ref) => {
  return (
    <div className="fullContainer" ref={ref}>
      <div className="friendMessage">
        <p className="text">{props.text}</p>
      </div>
      <span className="time">{props.time}</span>
    </div>
  );
});

export default FreindMessage;
