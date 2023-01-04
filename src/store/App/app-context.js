import React from "react";

export const AppContext = React.createContext({
  appDisplayMode: "light",
  isSearching: false,
  toggleMenu: false,
  onToggleSearch: () => {},
  onToggleMenu: () => {},
  onCloseMenu: () => {},
  onchangeAppDisplayMode: () => {},
});
