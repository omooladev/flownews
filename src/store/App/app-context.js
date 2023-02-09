import React from "react";

export const AppContext = React.createContext({
  appMode: { display: "light", isLoggedIn: false, username: "" },
  onchangeAppDisplayMode: () => {},
  isSearching: false,
  onToggleSearch: () => {},
  menuIsActive: false,
  onToggleMenu: () => {},
  onCloseMenu: () => {},
  profileBoxIsActive: false,
  onToggleProfileBox: () => {},
  onCloseProfileBox: () => {},
  lastLocation: "",
  onSetLastLocation: () => {},
  popUp: { state: false, type: "", from: "" },
  onPopUp: () => {},
});
