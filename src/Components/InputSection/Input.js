import React from "react";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import "./Input.css";

function Input() {
  return (
    <div className="inputSection">
      <input type="text" placeholder="Type your message..." />

      <IconButton type="Submit">
        <SendIcon />
      </IconButton>
    </div>
  );
}

export default Input;
