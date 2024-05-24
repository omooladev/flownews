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
  appMode: {
    isConnectingSocial: true || false,
    isLoggedIn: true || false,
    theme: "light-default" || "dark-default",
    token: null,
    tokenExpirationTime: null,
  },
  changeAppMode: (properties, type = null) => {},

  //refactored
  contributorData: { username: "" },
  lastLocation: "",
  makeBodyFixed: false,
  onMakeBodyFixed: (bool) => {},
  onSaveContributorData: (data) => {},
  onUpdateContributorProfile: async () => {},
  profileUpdated: { show: false, message: "" },
  onChangeProfileUpdated: async (show, message) => {},
  onToggleEmailPrivacy: async () => {},
  onDeleteContributorAccount: async ({ userNameOrEmail, verifyText, password }) => {},

  cancelRequest: () => {},
  pageIsLoading: false,

  //<--------- for new content ---------->
  newStory: { isEditing: false, value: "" },
  onUpdateNewContent: (isEditing, value) => {},
});
