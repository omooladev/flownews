import React from "react";

export const AuthContext = React.createContext({
  HOSTURI: "",
  token: "",
  userData: {},
  searchedContributorData: {},
  isLoading: false,
  headerIsLoading: false,
  isLoggedIn: false,
  contributorError: { ref: "", message: "" },
  authMessage: { type: "", message: "" },
  profileUpdated: false,
  onCloseProfileUpdated: () => {},
  onSetUserData: () => {},
  onUpdateContributorProfile: () => {},
  onChangeAuthMessage: () => {},
  onResetAuthMessage: () => {},
  on_Login_BecomeContributor: () => {},
  onGetContributorData: () => {},
  onSignOut: () => {},

  onUpdate_ResetPassword: async () => {},
  showEmailLinkSentPopUp: false,
  onSetShowEmailLinkSentPopUp: (bool) => {},
  onVerifyEmailAddress: async () => {},
  onGetPasswordResetEmail: async () => {},
});
