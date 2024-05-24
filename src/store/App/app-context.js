import React from "react";

export const AppContext = React.createContext({
  popUp: { state: false, type: "", from: "" },
  onPopUp: () => {},
  lastLocation: "",
  onSetLastLocation: () => {},
  appMode: {
    isConnectingSocial: true || false,
    isLoggedIn: true || false,
    theme: "light-default" || "dark-default",
    token: null,
    tokenExpirationTime: null,
  },
  onChangeAppMode: () => {},
  componentsIsActive: {
    menuIsActive: false,
    profileBoxIsActive: false,
    searchFieldIsActive: false,
    accountSubscribeContainerIsActive: false,
    uploadContainerIsActive: false,
    NewStorySettingModalIsActive: false,
  },
  onToggleComponentsIsActive: ({ type, event }) => {},
});
