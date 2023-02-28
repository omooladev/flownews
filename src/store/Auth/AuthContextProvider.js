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
  const [isLoading, setIsLoading] = useState(false);
  const [headerIsLoading, setHeaderIsLoading] = useState(false);
  const isLoggedIn = appMode.isLoggedIn;
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [authMessage, setAuthMessage] = useState({ type: "", message: "" });
  const [contributorError, setContributorError] = useState({ ref: "", message: "" });
  const history = useHistory();

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
    history.replace("/home");
  }, [history, onCloseProfileBox, onChangeAppMode]);

  const resetAuthMessage = useCallback(() => {
    setAuthMessage((prevMessage) => {
      return { ...prevMessage, type: "", message: "" };
    });
  }, []);

  const updateContributorProfileHandler = useCallback(
    async (updateProperties) => {
      const response = await sendRequest(`${HOSTURI}/update-profile`, {
        method: "PATCH",
        userData: { contributorEmail: userData.email, updateProperties },
        token,
      });
      const error = response.error || "";
      const data = response.data || "";

      if (data) {
        const message = data.message || "";
        if (!message) {
          setUserData((prevData) => {
            return { ...prevData, ...data };
          });
          setProfileUpdated(true);
          onChangeAppMode({ username: data.username, token: data.token });
        }
      }
      if (error) {
        setProfileUpdated(false);
        return error;
      }
      return;
    },
    [sendRequest, userData, token, onChangeAppMode]
  );

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

  const setUserDataHandler = useCallback((data) => {
    setUserData((prevData) => {
      return { ...prevData, ...data };
    });
  }, []);

  const getPasswordResetEmailHandler = useCallback(
    async (email, title) => {
      setIsLoading((prevState) => {
        return true;
      });
      const response = await sendRequest(`${HOSTURI}/auth/password/${title}`, {
        method: "POST",
        userData: { email },
      });
      const error = response.error || "";
      const status = response.status || "";
      setIsLoading((prevState) => {
        return false;
      });
      if (status === 200) {
        return "password reset link sent";
      }
      if (error) {
        setAuthMessage((prevMessage) => {
          return { ...prevMessage, type: "error", message: error };
        });
      }
    },
    [sendRequest]
  );
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
        isLoading,
        headerIsLoading,
        isLoggedIn,
        authMessage,
        contributorError,
        onUpdateContributorProfile: async (updateProperties) =>
          updateContributorProfileHandler(updateProperties),
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
        onGetPasswordResetEmail: getPasswordResetEmailHandler,

        changeAppMode: onChangeAppMode,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
