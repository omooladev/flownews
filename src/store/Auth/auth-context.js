import React from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onSignOut: () => {},
  dummy_contributor_data: {},
});
