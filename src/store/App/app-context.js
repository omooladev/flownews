import React from "react";

export const AppContext = React.createContext({
  popUp: { state: false, type: "", from: "" },
  onPopUp: () => {},
  //? refactored
  lastLocation: "",
  onSetLastLocation: () => {},
  appMode: { display: "light", isLoggedIn: false, username: "" },
  onChangeAppMode: () => {},
  componentsIsActive: {
    menuIsActive: false,
    profileBoxIsActive: false,
    searchFieldIsActive: false,
  },
  onToggleComponentsIsActive: () => {},
});
