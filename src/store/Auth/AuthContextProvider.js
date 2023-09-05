import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { AppContext } from "../App/app-context";
import useHttp from "../../hooks/useHttp";
import NotFound from "../../pages/NotFound/NotFound";
//const HOSTURI = "http://localhost:5000/api/v1";
const HOSTURI = "https://flownews-api.onrender.com/api/v1";
const AuthContextProvider = (props) => {
  //----------> get the http request functions from the useHttp hook
  const { sendRequest, cancelRequest } = useHttp();

  const {
    appMode: { isLoggedIn, token },
    onChangeAppMode,
    onToggleComponentsIsActive,
    lastLocation,
  } = useContext(AppContext);

  const [makeBodyFixed, setMakeBodyFixed] = useState(false);
  const [searchedContributorData, setSearchedContributorData] = useState({ username: "" });
  const [pageIsLoading, setPageIsLoading] = useState(false);

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
        //* This means that if contributor data exits already, then there is no need to fetch data again
        return;
      }
      setPageIsLoading((prevState) => {
        return true;
      });

      const response = await sendRequest(`${HOSTURI}/@${username}`, {
        method: "GET",
        token,
      });
      //todo----------> i will change this later that there is no need to send the username as part of the request
      //todo                We only send the token.
      const data = response.data;
      const error = response.error;

      if (data) {
        const isSearch = data.isSearch;
        if (!isSearch) {
          //----------> To put it simply, if we are not searching for a specific contributor,
          //            then the data that we get is guaranteed to be from that contributor
          setContributorData((prevData) => {
            return { ...prevData, ...data };
          });
        }
        if (isSearch) {
          //----------> if we are searching for a contributor, then the data gotten is for the
          //            searched contributor
          setSearchedContributorData((prevData) => {
            return { ...prevData, ...data };
          });
        }
      }
      if (error) {
        console.log(error);
        if (error === "Cannot find your account") {
          //----------> if your account cannot be found or token has expired we redirect you to the login page
          //return onChangeAppMode({ token: null, isLoggedIn: false, username: null });
        }
        if (error === "Cannot find contributor") {
          //----------> if the contributor you're searching for does not exist,
          //            we display the 404 page
        }
        setContributorError((prevError) => {
          return { ...prevError, ref: "home", message: error };
        });
      }

      return setPageIsLoading((prevState) => {
        return false;
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
        pageIsLoading,
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
        makeBodyFixed,
        onMakeBodyFixed: (bool) => setMakeBodyFixed(bool),
        onUpdateContributorProfile: updateContributorProfile,
        onToggleEmailPrivacy: toggleEmailPrivacy,
        onSendPasswordResetEmail: sendPasswordResetEmail,

        cancelRequest,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
