const initialState = {
  mobileView: window.innerWidth < 700,
  auth: "false",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOBILEVIEW": {
      const myState = { ...initialState };
      const mobile = action.mobileView;
      myState.mobileView = mobile;
      return myState;
    }

    case "IS_LOGGED_IN": {
      const myState = { ...initialState };
      myState.auth = "true";
      return myState;
    }

    default: {
      const myState = { ...initialState };
      return myState;
    }
  }
};

export default reducer;
