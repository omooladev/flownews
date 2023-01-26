import React from "react";

export const AppContext = React.createContext({
  appMode: { display: "light", isLoggedIn: false, username: "" },
  isSearching: false,
  toggleMenu: false,
  lastLocation: "",
  onSetLastLocation: () => {},
  popUp: { state: false, type: "", from: "" },
  profileBoxIsActive: false,
  onToggleProfileBox: () => {},
  onCloseProfileBox: () => {},
  onPopUp: () => {},
  onToggleSearch: () => {},
  onToggleMenu: () => {},
  onCloseMenu: () => {},
  onchangeAppDisplayMode: () => {},
});
