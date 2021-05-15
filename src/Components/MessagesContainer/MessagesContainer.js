import React from "react";

import "./MessagesContainer.css";
import MessageList from "../MessageList/MessageList";

function MessagesContainer() {
  return (
    <div className="messageBox">
      <MessageList />
    </div>
  );
}

export default MessagesContainer;
