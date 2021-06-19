import React, { useState, useEffect, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { connect } from "react-redux";
import axios from "axios";
import { format } from "timeago.js";

import "./MessageList.css";
import FriendMessage from "../Message/FriendMessage";
import AdminMessage from "../Message/AdminMessage";

function MessageList(props) {
  const msgRef = useRef(null);
  const [msg, setMsg] = useState(props.messages);
  const convID = props.conversationID;
  const [arrivedMsg, setArrivedmsg] = useState([]);

  useEffect(() => {
    props.socket.on("getMessage", (data) => {
      setArrivedmsg({
        conversationID: convID,
        senderId: data.senderId,
        text: data.text,
        timeStamp: Date.now(),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!msg || !arrivedMsg) return;
    setMsg([...msg, arrivedMsg]);
    setTimeout(() => {
      msgRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivedMsg]);

  useEffect(() => {
    const getMessages = async () => {
      if (!convID) {
        return;
      }
      try {
        const messages = await axios.get(
          `${process.env.REACT_APP_SERVER}/chat/conversation/` + convID
        );
        props.setMsgCollection(messages.data);
        setMsg(messages.data);
        // if (Object.keys(msgRef).length >= 1 || !msgRef) {
        if (msgRef.current) {
          setTimeout(() => {
            msgRef.current.scrollIntoView();
          }, 0);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selected.uid]);

  return (
    <ScrollToBottom>
      <div className="messages_list">
        {msg?.map((m, i) => {
          if (m.senderId === props.uid) {
            return (
              <AdminMessage
                key={i}
                ref={msgRef}
                text={m.text}
                time={format(m.timeStamp)}
                style={{ marginRight: "auto" }}
              />
            );
          } else {
            return (
              <FriendMessage
                key={i}
                ref={msgRef}
                text={m.text}
                time={format(m.timeStamp)}
                style={{ float: "left" }}
              />
            );
          }
        })}
      </div>
    </ScrollToBottom>
  );
}

/***************************************************************/

const MapStateToProps = (state) => {
  return {
    uid: state.uid,
    conversationID: state.currentChatID,
    selected: state.selected,
    messages: state.messages,
    socket: state.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMsgCollection: (msgs) => {
      dispatch({
        type: "GET_MSG",
        messages: msgs,
      });
    },
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(MessageList);
