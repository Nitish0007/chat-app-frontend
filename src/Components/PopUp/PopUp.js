import { React } from "react";
import { Dialog, Divider, IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { connect } from "react-redux";

import "./PopUp.css";

function PopUp(props) {
  let enteredVal;
  const handletyping = (e) => {
    enteredVal = e.target.value;
    return enteredVal;
  };

  return (
    <Dialog open={props.open}>
      <div className="modal">
        <IconButton style={{ marginLeft: "auto" }} onClick={props.handleModal}>
          <CancelIcon />
        </IconButton>
        <h2 className="modal_title">Add Friend</h2>
        <Divider className="modal_divider" />
        <div className="modal_input_section">
          <input
            className="modal_input"
            placeholder="Enter Friend's Id"
            onChange={(e) => handletyping(e)}
            value={enteredVal}
          />
          <button
            className="modal_btn"
            onClick={() => {
              props.addUser(enteredVal);
            }}
          >
            Add Friend
          </button>
        </div>
      </div>
    </Dialog>
  );
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    friends: state.friends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (friend) => {
      dispatch({
        type: "ADD_FRIEND",
        addfriend: friend,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
