import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./MessageList.css";
import FriendMessage from "../Message/FriendMessage";
import AdminMessage from "../Message/AdminMessage";

function MessageList() {
  return (
    <ScrollToBottom>
      <div className="messages_list">
        <FriendMessage style={{ float: "left" }} />
        <AdminMessage style={{ marginRight: "auto" }} />
      </div>
    </ScrollToBottom>
  );
}

export default MessageList;
