import React from "react";

export const AppContext = React.createContext({
  appDisplayMode: "light",
  onchangeAppDisplayMode: () => {},
});
