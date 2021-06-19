import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { connect } from "react-redux";

import "./Input.css";

function Input(props) {
  const [newMsg, setNewmsg] = useState("");
  const [messages, setMessages] = useState([]);

  // window.addEventListener("keyup", (e) => {
  //   if (e.key === "Enter") {
  //     console.log("keyup");
  //     if (newMsg && newMsg.trim()) {
  //       sendMessage();
  //     }
  //   }
  // });

  const sendMessage = async () => {
    if (!props.convID) return;
    const message = {
      senderId: props.uid,
      text: newMsg,
      conversationId: props.convID,
      timeStamp: Date.now(),
    };

    try {
      const newMessage = await axios.post(
        `${process.env.REACT_APP_SERVER}/message`,
        message
      );
      setMessages([...messages, newMessage.data]);
      props.updateMessages(messages);
      setNewmsg("");
    } catch (err) {
      console.log(err);
    }

    const recieverId = await props.selected.uid;

    props.socket.emit("sendMessage", {
      recieverId: recieverId,
      senderId: message.senderId,
      text: message.text,
      conversationId: props.convID,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (newMsg && newMsg.trim()) {
          sendMessage();
        }
      }}
    >
      <div className="inputSection">
        <input
          type="text"
          placeholder="Type your message..."
          onChange={(e) => setNewmsg(e.target.value)}
          value={newMsg}
        />
        <IconButton type="Submit">
          <SendIcon />
        </IconButton>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    uid: state.uid,
    convID: state.currentChatID,
    messsage: state.messages,
    selected: state.selected,
    socket: state.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (updatedMsgArray) => {
      dispatch({
        type: "SET_MSG",
        messages: updatedMsgArray,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
