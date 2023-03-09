import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { AppContext } from "../App/app-context";
import useHttp from "../../hooks/useHttp";

const HOSTURI = "http://localhost:5000/api/v1";
//const HOSTURI = "https://flownews-api.onrender.com/api/v1";
const AuthContextProvider = (props) => {
  const { sendRequest } = useHttp();

  const { appMode, onCloseProfileBox, onChangeAppMode } = useContext(AppContext);
  const [showEmailLinkSentPopUp, setShowEmailLinkSentPopUp] = useState(false);
  const [userData, setUserData] = useState({ username: "" });

  const token = appMode.token;

  const [searchedContributorData, setSearchedContributorData] = useState({
    user: { username: "" },
  });
  const [headerIsLoading, setHeaderIsLoading] = useState(false);
  const isLoggedIn = appMode.isLoggedIn;
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [authMessage, setAuthMessage] = useState({ type: "", message: "" });
  const [contributorError, setContributorError] = useState({ ref: "", message: "" });
  const history = useHistory();

  //?refactored
  //const [contributorData, setContributorData] = useState({ username: "" });//TODO this will replace the user data
  const changeAuthMessage = useCallback((authMessage) => {
    setAuthMessage((prevMessage) => {
      return { ...prevMessage, ...authMessage };
    });
  }, []);
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
      if (userData.username) {
        return;
      }
      setHeaderIsLoading((prevState) => {
        return !prevState;
      });

      const response = await sendRequest(`${HOSTURI}/@${username}`, {
        method: "GET",
        token,
      });
      const error = (await response.error) || "";
      const data = (await response.data) || "";
      if (data) {
        const isSearch = data.isSearch || "";
        if (!isSearch) {
          setUserData((prevData) => {
            return { ...prevData, ...data };
          });
        }
        if (isSearch) {
          setSearchedContributorData((prevData) => {
            return { ...prevData, ...data };
          });
        }
      }
      if (error) {
        if (error === "Cannot find your account") {
          return onChangeAppMode({ token: null, isLoggedIn: false, username: null });
        }
        setContributorError((prevError) => {
          return { ...prevError, ref: "home", message: error };
        });
      }

      return setHeaderIsLoading((prevState) => {
        return !prevState;
      });
    },
    [sendRequest, token, userData.username, onChangeAppMode]
  );

  const signOutHandler = useCallback(() => {
    onChangeAppMode({ isLoggedIn: false, token: null, username: null, tokenExpirationTime: null });
    onCloseProfileBox();
    setProfileUpdated(false);
    setUserData((prevData) => {
      return { username: "" };
    });
    history.replace("/home");
  }, [history, onCloseProfileBox, onChangeAppMode]);

  const resetAuthMessage = useCallback(() => {
    setAuthMessage((prevMessage) => {
      return { ...prevMessage, type: "", message: "" };
    });
  }, []);

  const update_ResetPasswordHandler = useCallback(
    async (title, passwordProperties) => {
      const response = await sendRequest(`${HOSTURI}/password/${title}`, {
        method: "PATCH",
        userData: { passwordProperties },
        token,
      });
      return response;
    },
    [sendRequest, token]
  );

  const verifyEmailHandler = useCallback(
    async (uri) => {
      const response = await sendRequest(`${HOSTURI}/auth${uri}`, {
        method: "PATCH",
      });
      return response;
    },
    [sendRequest]
  );

  const resetPasswordHandler = useCallback(
    async (username, passwordProperties) => {
      const response = await sendRequest(`${HOSTURI}/auth/${username}/reset_password`, {
        method: "PATCH",
        contributorData: passwordProperties,
      });
      return response;
    },
    [sendRequest]
  );

  const setUserDataHandler = useCallback((data) => {
    setUserData((prevData) => {
      return { ...prevData, ...data };
    });
  }, []);

  const sendPasswordResetEmail = useCallback(
    async (email, title) => {
      const response = await sendRequest(`${HOSTURI}/auth/password/${title}`, {
        method: "POST",
        contributorData: { email },
      });
      return response;
    },
    [sendRequest]
  );
  const verifyPasswordResetLink = useCallback(
    async (uri) => {
      const response = await sendRequest(`${HOSTURI}/auth${uri}`, {
        method: "POST",
      });
      return response;
    },
    [sendRequest]
  );
  //?refactored functions
  const saveContributorData = useCallback((data) => {
    setUserData((prevData) => {
      return { ...prevData, ...data };
    }); //TODO will replace this soon to the one commented below
    // setContributorData((prevData) => {
    //   return { ...prevData, ...data };
    // });
  }, []);
  const updateContributorProfile = useCallback(
    async (updateProperties) => {
      const response = await sendRequest(`${HOSTURI}/update-profile`, {
        method: "PATCH",
        contributorData: { updateProperties },
        token,
      });
      return response;
    },
    [sendRequest, token]
  );
  const toggleEmailPrivacy = useCallback(async () => {
    const response = await sendRequest(`${HOSTURI}/email/privacy`, {
      method: "PATCH",
      token,
    });
    return response;
  }, [sendRequest, token]);
  useEffect(() => {
    if (showEmailLinkSentPopUp) {
      return document.body.classList.add("fixed-body");
    }
    return document.body.classList.remove("fixed-body");
  }, [showEmailLinkSentPopUp]);
  return (
    <AuthContext.Provider
      value={{
        HOSTURI,
        token,
        history,
        userData,
        profileUpdated,
        onCloseProfileUpdated: () => {
          setProfileUpdated((prevState) => false);
        },
        searchedContributorData,
        headerIsLoading,
        isLoggedIn,
        authMessage,
        contributorError,

        onSetUserData: setUserDataHandler,
        onGetContributorData: getContributorData,
        onChangeAuthMessage: (authMessage) => {
          changeAuthMessage(authMessage);
        },
        onResetAuthMessage: resetAuthMessage,
        onLoginOrBecomeContributor: loginOrBecomeContributor,
        onSignOut: signOutHandler,

        onUpdate_ResetPassword: update_ResetPasswordHandler,
        showEmailLinkSentPopUp: showEmailLinkSentPopUp,
        onSetShowEmailLinkSentPopUp: (bool) => setShowEmailLinkSentPopUp(bool),
        onVerifyEmailAddress: verifyEmailHandler,
        onResetPassword: resetPasswordHandler,
        onSendPasswordResetEmail: sendPasswordResetEmail,
        onVerifyPasswordResetLink: verifyPasswordResetLink,

        changeAppMode: onChangeAppMode,

        //?Refactored already
        onSaveContributorData: saveContributorData,
        onUpdateContributorProfile: updateContributorProfile,
        onToggleEmailPrivacy: toggleEmailPrivacy,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
