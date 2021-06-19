import React, { forwardRef } from "react";

import "./AdminMessage.css";

const AdminMessage = forwardRef((props, ref) => {
  return (
    <div className="adminContainer" ref={ref}>
      <div className="adminMessage">
        <p className="text">{props.text}</p>
      </div>
      <p className="time">{props.time}</p>
    </div>
  );
});

export default AdminMessage;
