import React, { useRef } from "react";
import { IconButton } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import "./Profile.css";
import ProfilePic from "../ProfilePic/ProfilePic";

function Profile() {
  const linkRef = useRef();
  const handleCopyLink = () => {
    linkRef.current.select();
    document.execCommand("copy");
    window.navigator.clipboard.writeText(`${linkRef.current.value}`);
  };

  return (
    <div className="profile">
      <ProfilePic height="80px" width="80px" />
      <p className="name">UsernName</p>
      <div className="linkSection">
        <h6>Your Id:</h6>
        <div className="textSection">
          <textarea
            className="linkfield"
            disabled
            value="user-Id"
            ref={linkRef}
            style={{ resize: "none" }}
          />
          <IconButton onClick={handleCopyLink}>
            <FileCopyIcon />
          </IconButton>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Profile;
