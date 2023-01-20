import React from "react";

export const AuthContext = React.createContext({
  token: "",
  userData: {},
  isLoading: false,
  isLoggedIn: false,
  authMessage: { type: "", message: "" },
  onChangeAuthMessage: () => {},
  onResetAuthMessage: () => {},
  onLogin: () => {},
  onBecomeAContributor: () => {},
  onSignOut: () => {},
  dummy_contributor_data: {},
});
