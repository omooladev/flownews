import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { AppContext } from "../App/app-context";
import useHttp from "../../hooks/useHttp";
//const HOSTURI = "http://localhost:5000/api/v1";
const HOSTURI = "https://flownews-api.onrender.com/api/v1";
const AuthContextProvider = (props) => {
  const { sendRequest } = useHttp();

  const {
    appMode: { isLoggedIn, token },
    onChangeAppMode,
    onToggleComponentsIsActive,
    lastLocation,
  } = useContext(AppContext);

  const [makeBodyFixed, setMakeBodyFixed] = useState(false);
  const [searchedContributorData, setSearchedContributorData] = useState({ username: "" });
  const [headerIsLoading, setHeaderIsLoading] = useState(false);

  const [contributorError, setContributorError] = useState({ ref: "", message: "" });
  const history = useHistory();

  //?refactored
  const [contributorData, setContributorData] = useState({ username: "" });
  const [profileUpdated, setProfileUpdated] = useState(false);
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
      if (contributorData.username) {
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
          setContributorData((prevData) => {
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
    [sendRequest, token, contributorData.username, onChangeAppMode]
  );

  const signOutHandler = useCallback(() => {
    onChangeAppMode({ isLoggedIn: false, token: null, username: null, tokenExpirationTime: null });
    onToggleComponentsIsActive({ event: "*" });
    setProfileUpdated(false);
    setContributorData((prevData) => {
      return { username: "" };
    });
    history.replace("/home");
  }, [history, onToggleComponentsIsActive, onChangeAppMode]);

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
    setContributorData((prevData) => {
      return { ...prevData, ...data };
    });
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
  const changeProfileUpdated = useCallback((bool) => {
    return setProfileUpdated(bool);
  }, []);
  const toggleEmailPrivacy = useCallback(async () => {
    const response = await sendRequest(`${HOSTURI}/email/privacy`, {
      method: "PATCH",
      token,
    });
    return response;
  }, [sendRequest, token]);
  useEffect(() => {
    if (makeBodyFixed) {
      return document.body.classList.add("fixed-body");
    }
    return document.body.classList.remove("fixed-body");
  }, [makeBodyFixed]);
  return (
    <AuthContext.Provider
      value={{
        HOSTURI,
        token,
        history,
        searchedContributorData,
        headerIsLoading,
        isLoggedIn,
        contributorError,
        onGetContributorData: getContributorData,

        onLoginOrBecomeContributor: loginOrBecomeContributor,
        onSignOut: signOutHandler,

        onUpdate_ResetPassword: update_ResetPasswordHandler,

        onVerifyEmailAddress: verifyEmailHandler,
        onResetPassword: resetPasswordHandler,

        onVerifyPasswordResetLink: verifyPasswordResetLink,

        //?Refactored already
        lastLocation,
        contributorData,
        onSaveContributorData: saveContributorData,
        profileUpdated,
        onChangeProfileUpdated: changeProfileUpdated,
        changeAppMode: onChangeAppMode,
        makeBodyFixed: makeBodyFixed,
        onMakeBodyFixed: (bool) => setMakeBodyFixed(bool),
        onUpdateContributorProfile: updateContributorProfile,
        onToggleEmailPrivacy: toggleEmailPrivacy,
        onSendPasswordResetEmail: sendPasswordResetEmail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
