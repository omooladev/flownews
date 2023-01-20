import React from "react";

export const AuthContext = React.createContext({
  token: "",
  userData: {},
  searchedContributorData: {},
  isLoading: false,
  isLoggedIn: false,
  authMessage: { type: "", message: "" },
  onChangeAuthMessage: () => {},
  onResetAuthMessage: () => {},
  onLogin: () => {},
  onGetContributorData: () => {},
  onBecomeAContributor: () => {},
  onSignOut: () => {},
});
