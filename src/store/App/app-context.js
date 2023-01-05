import React from "react";

export const AppContext = React.createContext({
  appMode: { display: "light" },
  isSearching: false,
  toggleMenu: false,
  popUp: { state: false, type: "", from: "" },
  onPopUp: () => {},
  onToggleSearch: () => {},
  onToggleMenu: () => {},
  onCloseMenu: () => {},
  onchangeAppDisplayMode: () => {},
});
