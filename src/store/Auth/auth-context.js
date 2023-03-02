import React from "react";

export const AuthContext = React.createContext({
  HOSTURI: "",
  token: "",
  history: "",
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
  //? auth functions
  onLoginOrBecomeContributor: async () => {},
  onGetContributorData: () => {},
  onSignOut: () => {},

  onUpdate_ResetPassword: async () => {},
  showEmailLinkSentPopUp: false,
  onSetShowEmailLinkSentPopUp: (bool) => {},
  onVerifyEmailAddress: async () => {},
  onResetPassword: async () => {},
  onSendPasswordResetEmail: async () => {},
  onVerifyPasswordResetLink: async () => {},
  changeAppMode: () => {},

  //refactored
  onSaveContributorData:()=>{},
  onToggleEmailPrivacy: async () => {},
});
