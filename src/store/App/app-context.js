import React from "react";

export const AppContext = React.createContext({
  appMode: { display: "light" },
  isSearching: false,
  toggleMenu: false,
  lastLocation: "",
  onSetLastLocation: () => {},
  popUp: { state: false, type: "", from: "" },
  onPopUp: () => {},
  onToggleSearch: () => {},
  onToggleMenu: () => {},
  onCloseMenu: () => {},
  onchangeAppDisplayMode: () => {},
});
