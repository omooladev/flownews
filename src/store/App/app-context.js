import React from "react";

export const AppContext = React.createContext({
  appMode: { display: "light", isLoggedIn: false, username: "" },
  onChangeAppMode: () => {},
  lastLocation: "",
  onSetLastLocation: () => {},
  popUp: { state: false, type: "", from: "" },
  onPopUp: () => {},
  //? refactored
  componentsIsActive: {
    menuIsActive: false,
    profileBoxIsActive: false,
    searchFieldIsActive: false,
  },
});
