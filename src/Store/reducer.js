const initialState = {
  mobileView: window.innerWidth < 700,
  auth: false,
  uid: "",
  name: "",
  userName: "",
  friends: [],
  messages: [],
  currentChatID: "",
  selected: {},
  socket: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOBILEVIEW": {
      const myState = { ...state };
      const mobile = action.mobileView;
      myState.mobileView = mobile;
      return myState;
    }
    case "SET_SOCKET": {
      const myState = { ...state };
      const newSocket = action.socket;
      myState.socket = newSocket;
      return myState;
    }

    case "IS_LOGGED_IN": {
      const myState = { ...state };
      const auth = action.auth;
      const uid = action.uid;
      const userName = action.userName;
      const name = action.name;
      const messages = action.messages;
      const friends = action.friends;
      myState.socket.emit("addUser", uid);
      myState.auth = auth;
      myState.uid = uid;
      myState.name = name;
      myState.userName = userName;
      myState.messages = messages;
      myState.friends = friends;

      return myState;
    }
    case "OPEN_CHAT": {
      const myState = { ...state };
      const selectedUser = action.selected;
      const updateChatID = action.currentChatID;
      myState.selected = selectedUser;
      myState.currentChatID = updateChatID;
      return myState;
    }
    case "GET_MSG": {
      const myState = { ...state };
      const msgCollection = action.messages;
      myState.messages = msgCollection;
      return myState;
    }
    case "SET_MSG": {
      const myState = { ...state };
      const updatedCollection = action.messages;
      myState.messages = updatedCollection;
      return myState;
    }
    case "ADD_FRIEND": {
      const myState = { ...state };
      const friendToAdd = action.friends;
      myState.friends = friendToAdd;
      return myState;
    }

    default: {
      const myState = { ...state };
      return myState;
    }
  }
};

export default reducer;
