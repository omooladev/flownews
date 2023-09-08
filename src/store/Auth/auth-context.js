import React from "react";

export const AuthContext = React.createContext({
  HOSTURI: "",
  token: "",
  history: "",
  searchedContributorData: {},
  onResetSearchedContributor: () => {},
  onToggleFollowContributor: () => {},
  isLoading: false,
  headerIsLoading: false,
  isLoggedIn: false,
  contributorError: { hasError: "", message: "" },
  onResetContributorError: () => {},

  //? auth functions
  onLoginOrBecomeContributor: async () => {},
  onGetContributorData: () => {},
  onSignOut: () => {},

  onUpdate_ResetPassword: async () => {},

  onVerifyEmailAddress: async () => {},
  onResetPassword: async () => {},
  onSendPasswordResetEmail: async () => {},
  onVerifyPasswordResetLink: async () => {},
  changeAppMode: () => {},

  //refactored
  contributorData: { username: "" },
  lastLocation: "",
  makeBodyFixed: false,
  onMakeBodyFixed: (bool) => {},
  onSaveContributorData: (data) => {},
  onUpdateContributorProfile: async () => {},
  profileUpdated: false,
  onChangeProfileUpdated: async () => {},
  onToggleEmailPrivacy: async () => {},

  cancelRequest: () => {},
  pageIsLoading: false,
});
