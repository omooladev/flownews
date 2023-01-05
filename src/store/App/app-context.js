import React from "react";

export const AppContext = React.createContext({
  appMode: { display: "light" },
  isSearching: false,
  toggleMenu: false,
  onToggleSearch: () => {},
  onToggleMenu: () => {},
  onCloseMenu: () => {},
  onchangeAppDisplayMode: () => {},
});
