import React from "react";

export const AuthContext = React.createContext({
  token: "",
  userData: {},
  searchedContributorData: {},
  isLoading: false,
  headerIsLoading: false,
  isLoggedIn: false,
  contributorError: { ref: "", message: "" },
  authMessage: { type: "", message: "" },
  onChangeAuthMessage: () => {},
  onResetAuthMessage: () => {},
  on_Login_BecomeContributor: () => {},
  onGetContributorData: () => {},
  onSignOut: () => {},
});
