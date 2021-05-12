import React from "react";

import "./Profile.css";
import ProfilePic from "../ProfilePic/ProfilePic";

function Profile() {
  return (
    <div className="profile">
      <ProfilePic height="80px" width="80px" />
      <p className="name">adminUser</p>
    </div>
  );
}

export default Profile;
