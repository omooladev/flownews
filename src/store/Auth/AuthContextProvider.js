import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { AppContext } from "../App/app-context";
import useHttp from "../../hooks/useHttp";
import { createRandomString } from "../../utils/createRandomStrings";

//<---------- constant variables ---------->
//const HOSTURI = "http://localhost:5000/api/v1";
const HOSTURI = "https://flownews-api.onrender.com/api/v1";
const AuthContextProvider = (props) => {
  const { sendRequest, cancelRequest } = useHttp();
  const {
    appMode,
    appMode: { isLoggedIn, token },
    onChangeAppMode,
    onToggleComponentsIsActive,
    lastLocation,
  } = useContext(AppContext);

  //<---------------------------------------- USE STATE STARTS HERE ---------------------------------------->
  const history = useHistory();
  const [makeBodyFixed, setMakeBodyFixed] = useState(false); //----------> Used to make body fixed when a pop up is shown
  const [pageIsLoading, setPageIsLoading] = useState(null);

  const [contributorError, setContributorError] = useState({
    hasError: false,
    message: "",
    ref: null,
  });
  const [files, setFiles] = useState({
    coverImage: { showCropContainer: false, transformedFile: null, file: null, isCropped: false },
  });

  const [newStory, setNewStory] = useState({
    storyId: appMode.NewStorySettings?.storyId || null,
    viewPreview: appMode.NewStorySettings?.viewPreview || false,
    isEditing: appMode.NewStorySettings?.isEditing || false,
    title: appMode.NewStorySettings?.title || "",
    coverImage: appMode.NewStorySettings?.coverImage || "",
    value: appMode.NewStorySettings?.value || "",
    pageSettings: {
      ...(appMode.NewStorySettings
        ? { ...appMode.NewStorySettings.pageSettings }
        : { isAutoPreviewEnabled: true }),
    },
  });
  const [draftPreview, setDraftPreview] = useState(null);
  const [contributorData, setContributorData] = useState({ username: "" });
  const [searchedContributorData, setSearchedContributorData] = useState({
    username: "",
  });
  const [profileUpdated, setProfileUpdated] = useState({ show: false, message: "" }); //TODO remove this soon as it is replaced in the update profile page
  const [infoModal, setInfoModal] = useState({ show: false, message: "" });
  //<---------------------------------------- USE STATE ENDS HERE ---------------------------------------->

  const loginOrBecomeContributor = useCallback(
    async ({ location, contributorAuthData }) => {
      const response = await sendRequest(`${HOSTURI}/auth/${location}`, {
        method: "POST",
        contributorData: contributorAuthData,
      });
      return response;
    },
    [sendRequest]
  );

  const getContributorData = useCallback(
    async (username) => {
      //----------> Fetch the contributor data
      //----------> if username is found in the contributor data and
      //            no username is sent from the fetch contributor data hook
      //            or the username passed in the hook is the same as the one found
      //            in the contributor data or if the username found in the search
      //            contributor is the same as the one passed in the hook,
      //            then this means that we still have access to the Contributor details
      //            so do not fetch it again.
      //-----------> More Explanation is found at the bottom of the file

      if (
        contributorData.username &&
        (!username || contributorData.username === username || searchedContributorData.username === username)
      ) {
        //* This means that if contributor data exits already, then there is no need to fetch data again
        return;
      }

      setPageIsLoading((prevState) => {
        return true;
      });

      const response = await sendRequest(`${HOSTURI}/contributors${username ? "/" + username : ""}`, {
        method: "GET",
        token,
      });
      const data = response.data;
      const error = response.error;

      if (data) {
        const isSearch = data.isSearch;

        setContributorData((prevData) => {
          return { ...prevData, ...data.contributor };
        });

        if (isSearch) {
          //----------> if we are searching for a contributor, then the data gotten is for the
          //            searched contributor

          setSearchedContributorData((prevData) => {
            return { ...prevData, ...data.searchedContributor };
          });
        }
      }
      if (error) {
        if (error === "Cannot find contributor") {
          //----------> if the contributor you're searching for does not exist,
          //            we display the 404 page
          setContributorError((prevError) => {
            return { ...prevError, hasError: true, message: error };
          });
        } else if (error === "Authentication Failed" || error === "Cannot find your account") {
          onChangeAppMode({ token: null, isLoggedIn: false });
        } else {
          setContributorError((prevError) => {
            return {
              ...prevError,
              hasError: true,
              message: error,
              ref: "network_error",
            };
          });
        }
      }

      return setPageIsLoading((prevState) => {
        return false;
      });
    },
    [sendRequest, token, contributorData.username, searchedContributorData, onChangeAppMode]
  );

  const resetSearchedContributor = useCallback(() => {
    //----------> reset the searched contributor to not contain any data
    return setSearchedContributorData((prevData) => {
      return { username: "" };
    });
  }, []);

  const checkFieldExistence = useCallback(
    async ({ name, value }) => {
      //----------> send a request to the server to check the field
      try {
        const response = await sendRequest(
          `${HOSTURI}/contributor/check-field-existence?fieldName=${name}&fieldValue=${value}`,
          {
            method: "POST",
            token,
          }
        );
        const data = response.data;

        if (data) {
          return { ...data, hasError: false };
        }

        return response;
      } catch (error) {
        return { hasError: true, error };
      }
    },
    [sendRequest, token]
  );

  const toggleFollowContributor = useCallback(
    async ({ action }) => {
      //----------> a function that lets you follow or un follow a contributor
      const response = await sendRequest(
        `${HOSTURI}/contributor/follow?action=${action}&username=${searchedContributorData.username}`,
        {
          method: "POST",
          token,
        }
      );
      const data = response.data;
      const error = response.error;
      if (data) {
        //----------> update the contributor data state
        setContributorData((prevData) => {
          return { ...prevData, ...data.contributor };
        });
        //----------> update the searched contributor data state
        setSearchedContributorData((prevData) => {
          return { ...prevData, ...data.searchedContributor };
        });
        // //----------> if we have successfully unfollowed the contributor then can can reset the
        // if (action === "unfollow") {
        //   return "success";
        // }
      }
      if (error) {
        console.log(error);
        return;
      }
    },
    [searchedContributorData, sendRequest, token]
  );
  const resetContributorError = useCallback(() => {
    setContributorError((prevError) => {
      return { ...prevError, hasError: false, message: "" };
    });
  }, []);
  const signOutHandler = useCallback(() => {
    onChangeAppMode({
      isLoggedIn: false,
      token: null,
      username: null,
      tokenExpirationTime: null,
    });
    onToggleComponentsIsActive({ event: "*" });
    setContributorData((prevData) => {
      return { username: "" };
    });
    history.replace("/home");
  }, [history, onToggleComponentsIsActive, onChangeAppMode]);

  const verifyEmailAddressHandler = useCallback(
    async (uri) => {
      //<---------- FUNCTION FOR VERIFYING EMAIL ADDRESS ---------->
      const response = await sendRequest(`${HOSTURI}/auth${uri}`, {
        method: "PATCH",
      });
      return response;
    },
    [sendRequest]
  );

  const update_ResetPasswordHandler = useCallback(
    async (action, field, passwordProperties) => {
      let uri;
      if (action === "reset_password") {
        uri = `auth/${field}/reset_password`;
      } else {
        uri = `password/${action}`;
      }
      const response = await sendRequest(`${HOSTURI}/${uri}`, {
        method: "PATCH",
        contributorData: { passwordProperties },
        ...(token && { token }),
      });
      return response;
    },
    [sendRequest, token]
  );

  const sendPasswordResetEmail = useCallback(
    async (email, action) => {
      const response = await sendRequest(`${HOSTURI}/auth/password/${action}`, {
        method: "POST",
        contributorData: { email },
      });
      return response;
    },
    [sendRequest]
  );
  const verifyPasswordResetLink = useCallback(
    async (uri) => {
      //---------> function for verifying password reset link
      const response = await sendRequest(`${HOSTURI}/auth${uri}`, {
        method: "POST",
      });
      return response;
    },
    [sendRequest]
  );

  const saveContributorData = useCallback((data) => {
    //<---------- FUNCTION FOR SAVING CONTRIBUTOR DATA IN OUR APPLICATION ---------->
    setContributorData((prevData) => {
      return { ...prevData, ...data };
    });
  }, []);
  //<---------- FUNCTION FOR UPDATING THE CONTRIBUTOR DATA---------->
  const updateContributorProfile = useCallback(
    async (updateProperties) => {
      const { data, error } = await sendRequest(`${HOSTURI}/contributor/update-profile`, {
        method: "PATCH",
        contributorData: updateProperties,
        token,
      });
      if (data) {
        return { hasError: false, data };
      }
      if (error) {
        //----------> separate the error based on the commas
        return { hasError: true, error: error.split(",") };
      }
    },
    [sendRequest, token]
  );
  //<---------- Function for updating the info modal ---------->
  const changeInfoModal = useCallback((show, message) => {
    return setInfoModal((prevState) => {
      return { show, message };
    });
  }, []);
  //<---------- Function for updating the profile updated state ---------->
  const changeProfileUpdated = useCallback((show, message) => {
    return setProfileUpdated((prevState) => {
      return { show, message };
    });
  }, []);

  //<---------- Function for toggling Email Privacy---------->
  const toggleEmailPrivacy = useCallback(async () => {
    const response = await sendRequest(`${HOSTURI}/email/privacy`, {
      method: "PATCH",
      token,
    });
    return response;
  }, [sendRequest, token]);

  const changeProfilePicture = useCallback(
    async ({ action, isCropped, profilePicture }) => {
      let contributorData;
      if (action === "save") {
        contributorData = new FormData();
        //----------> if cropped, then name the image while appending it to the form data
        contributorData.append("image", profilePicture, isCropped && "cropped_image.jpeg");
      }
      if (action === "remove") {
        contributorData = { profilePicture };
      }
      const response = await sendRequest(
        `${HOSTURI}/contributor/update-profile?action=profile-picture&&actionType=${action}`,
        { method: "PATCH", token, contributorData, contentType: action === "save" && "multipart/form-data" }
      );
      return response;
    },
    [token, sendRequest]
  );

  const deleteContributorAccount = useCallback(
    async (data) => {
      const response = await sendRequest(`${HOSTURI}/contributor/delete-account`, {
        method: "POST",
        token,
        contributorData: data,
      });
      return response;
    },
    [sendRequest, token]
  );

  const updateNewStory = useCallback((data) => {
    return setNewStory((prevData) => {
      return { ...prevData, ...data };
    });
  }, []);

  //<---------- function for updating files ---------->
  const updateFiles = useCallback((newFiles) => {
    return setFiles((prevFiles) => {
      return { ...prevFiles, ...newFiles };
    });
  }, []);

  //<---------- Function for saving story as either draft or published to the database ---------->
  const saveStoryToDatabase = useCallback(
    async ({ story = newStory, status }) => {
      const { title, coverImage, value, storyId } = story;
      if (title || coverImage || value) {
        const response = await sendRequest(`${HOSTURI}/contributor/story/${status}?storyId=${storyId}`, {
          method: "POST",
          contributorData: {
            ...(title && { title }),
            ...(coverImage && { coverImage }),
            ...(value && { content: value }),
          },
          token,
        });

        return response;
      }
    },
    [sendRequest, token, newStory]
  );

  const configureNewStoryTemporaryIdentifier = useCallback(
    async (action) => {
      if (action === "add") {
        const storyId = await createRandomString(12); //24
        return setNewStory((prevState) => {
          return { ...prevState, storyId };
        });
      }
      if (action === "remove") {
        //----------> if the contributor visits another page, we want to save the content of the new story to the database as draft and
        // we also want to clear it from the local storage
        //----------> before saving to draft, we check if any of title, coverImage, value exist
        await saveStoryToDatabase({ status: "draft" });
        setNewStory((prevState) => {
          return { ...prevState, storyId: null, coverImage: "", title: "", value: "" };
        });
      }
    },
    [saveStoryToDatabase]
  );

  //<---------------------------------------- USE EFFECTS STARTS HERE ---------------------------------------->
  useEffect(() => {
    //<---------- for updating the new story on the local storage --------->
    if (newStory) {
      onChangeAppMode({ NewStorySettings: newStory });
    }
  }, [newStory, onChangeAppMode]);
  //<----------- use effect for adding and deleting a new story temporary identifier -------->
  useEffect(() => {
    if (history.location.pathname.startsWith("/new-story") && newStory.storyId === null) {
      configureNewStoryTemporaryIdentifier("add");
    }
    if (
      !history.location.pathname.startsWith(`/story/${newStory.storyId}/edit`) &&
      !history.location.pathname.startsWith("/new-story") &&
      newStory.storyId !== null
    ) {
      configureNewStoryTemporaryIdentifier("remove");
    }
  }, [history.location.pathname, newStory.storyId, configureNewStoryTemporaryIdentifier]);

  //<---------- use effect for changing the url when the title or other content is not null -------->
  useEffect(() => {
    if (
      history.location.pathname.startsWith("/new-story") &&
      newStory.storyId !== null &&
      (newStory.title || newStory.coverImage || newStory.value)
    ) {
      history.push(`/story/${newStory.storyId}/edit`);
    }
  }, [history, newStory]);

  //<----------- use effect for toggling the body document with a fixed class --------->
  useEffect(() => {
    if (makeBodyFixed) {
      return document.body.classList.add("fixed-body");
    }
    return document.body.classList.remove("fixed-body");
  }, [makeBodyFixed]);

  //<---------- use effect for changing the background color of the draft preview page for dark theme ---------->
  useEffect(() => {
    const handleBackgroundColor = () => {
      if (
        (history.location.pathname.includes("/story/draft/preview") ||
          history.location.pathname === `/@${contributorData.username}`) &&
        appMode.theme === "dark-default"
      ) {
        document.body.style.backgroundColor = "black";
      } else {
        document.body.style.backgroundColor = "";
      }
    };
    handleBackgroundColor();
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [history.location.pathname, appMode.theme, contributorData.username]);

  //<--------- USE EFFECTS ENDS HERE ---------->
  return (
    <AuthContext.Provider
      value={{
        appMode,
        HOSTURI,
        token,
        history,
        searchedContributorData,
        onResetSearchedContributor: resetSearchedContributor,
        pageIsLoading,
        isLoggedIn,
        contributorError,
        onResetContributorError: resetContributorError,
        onGetContributorData: getContributorData,
        onToggleFollowContributor: toggleFollowContributor,
        onLoginOrBecomeContributor: loginOrBecomeContributor,
        onSignOut: signOutHandler,

        onUpdate_ResetPassword: update_ResetPasswordHandler,

        onVerifyEmailAddress: verifyEmailAddressHandler,

        onVerifyPasswordResetLink: verifyPasswordResetLink,

        //?Refactored already
        lastLocation,
        contributorData,
        onSaveContributorData: saveContributorData,
        profileUpdated,
        onChangeProfileUpdated: changeProfileUpdated,
        //<--------- INFO MODAL STARTS HERE ---------->
        infoModal,
        onChangeInfoModal: changeInfoModal,
        //<--------- INFO MODAL ENDS HERE ---------->
        changeAppMode: onChangeAppMode,
        //<----------- Variable and function responsible for making body fixed-------->
        makeBodyFixed,
        onMakeBodyFixed: (bool) => setMakeBodyFixed(bool),
        onUpdateContributorProfile: updateContributorProfile,
        onToggleEmailPrivacy: toggleEmailPrivacy,
        onSendPasswordResetEmail: sendPasswordResetEmail,

        cancelRequest,
        onCheckFieldExistence: checkFieldExistence,
        onChangeProfilePicture: changeProfilePicture,
        onDeleteContributorAccount: deleteContributorAccount,

        //<---------- new content ---------->
        newStory,
        onUpdateNewStory: updateNewStory,
        onSaveStoryToDatabase: saveStoryToDatabase,
        draftPreview,
        onSaveDraftPreview: (data) => {
          setDraftPreview(data);
        },

        //<---------- files ---------->
        files,
        onUpdateFiles: updateFiles,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

//imp---------------------> Documentation
//imp Case 1:    getContributorData
// When I as a contributor is logged Into my account and I refresh the profile page,
// a request is sent to fetch my details again because on refresh most of my details is already lost.
// Now If i try to access any other page, we need to be sure that my details is still retained on the request,
// we run the getContributorData function again and this time, we check if my username already exist on the request data
// If it is not found, we fetch the details from the database but If it is found, we navigate to the new page.
//imp Case 2:    getContributorData
// In this case, when we want to search for another contributor, we check if the username of the contributor you
// are searching for is not the same as yours. If it is the same, we do not proceed with your request, however if it
// is not the same, then we fetch the contributor and save his details to the search Contributor data.

//DOCUMENTATION ABOUT THE NEW STORY PAGE

//When a contributor visits the new story page, we create a temporary identifier for that page and
//the moment he starts writing content on the page, we redirect to the edit page which contains the
//temporary identifier in the url.If he tries to go back to the create story page and the temporary identifier is still
//available we will redirect the contributor automatically the the edit page based on the identifier.
// When he decides to leave any of the page, either the create story page or the edit page, we save the content already
// typed in the page to the database as a draft
// and then delete the identifier and every other crucial data on the local storage.
