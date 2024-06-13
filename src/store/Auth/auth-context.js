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
    NewStorySettings: { isAutoPreviewEnabled: true },
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
  //<---------- files ---------->
  files: { coverImage: { showCropContainer: false, isCropped: false, transformedFile: "", file: File } },
  onUpdateFiles: ({ coverImage: { showCropContainer, transformedFile, file, isCropped } }) => {},
  //<--------- for new story ---------->
  newStory: {
    isEditing: false,
    storyId: "",
    title: "",
    coverImage: "",
    value: "",
    viewPreview: false,
    pageSettings: { isAutoPreviewEnabled: true },
  },
  onUpdateNewStory: ({
    isEditing,
    title,
    storyId,
    coverImage,
    value,
    viewPreview,
    pageSettings: { isAutoPreviewEnabled },
  }) => {},
  onSaveStoryToDatabase: async ({ title, coverImage, value, storyId }, status) => {},
});
