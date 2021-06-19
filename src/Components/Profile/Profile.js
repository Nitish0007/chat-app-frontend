import React, { useState, useRef } from "react";
import { IconButton, Button } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PopUp from "../PopUp/PopUp";
import { connect } from "react-redux";

import "./Profile.css";
import ProfilePic from "../ProfilePic/ProfilePic";

export let isModalOpen;

/****************************************************/

function Profile(props) {
  const linkRef = useRef();
  let localStorageData;
  const handleCopyLink = () => {
    linkRef.current.select();
    document.execCommand("copy");
    window.navigator.clipboard.writeText(`${linkRef.current.value}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOnClick = () => {
    setIsModalOpen(false);
  };

  const addUser = (enteredVal) => {
    fetch(`${process.env.REACT_APP_SERVER}/add_friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: props.uid,
        friendID: enteredVal,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        const newFriend = data.newFriend;
        localStorageData = JSON.parse(localStorage.getItem("userData"));
        localStorageData.user.friends.push(newFriend);
        localStorage.setItem("userData", JSON.stringify(localStorageData));
        props.addFriend(localStorageData.user.friends);
        alert(data.message);
        return;
      })
      .catch((err) => {
        alert(err);
        console.log("Friend not added", err);
      });
    setIsModalOpen(false);
  };

  return (
    <div className="profile">
      <ProfilePic height="80px" width="80px" />
      <p className="name">Name: {props.name}</p>
      <p className="name">Username: {props.userName}</p>

      <div className="linkSection">
        <h6>Your Id:</h6>
        <div className="textSection">
          <textarea
            className="linkfield"
            disabled
            value={props.uid}
            ref={linkRef}
            style={{ resize: "none" }}
          />
          <IconButton onClick={handleCopyLink}>
            <FileCopyIcon />
          </IconButton>
          <IconButton
            className="addBtn"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <AddCircleIcon />
          </IconButton>
          <Button
            onClick={() => {
              localStorage.clear();
              props.socket.emit("user-logout");
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <PopUp
        open={isModalOpen}
        click={isModalOpen}
        handleModal={handleModalOnClick}
        addUser={addUser}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    uid: state.uid,
    name: state.name,
    socket: state.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (friendList) => {
      dispatch({
        type: "ADD_FRIEND",
        friends: friendList,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
