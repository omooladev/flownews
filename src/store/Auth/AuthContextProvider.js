import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { AppContext } from "../App/app-context";
import useHttp from "../../hooks/useHttp";

const HOSTURI = "http://localhost:5000/api/v1";
//const HOSTURI = "https://flownews-api.onrender.com/api/v1";
const AuthContextProvider = (props) => {
  const { sendRequest } = useHttp();
  const { appMode, onCloseProfileBox } = useContext(AppContext);
  const token = appMode.token;
  const [userData, setUserData] = useState({ username: "" });

  const [searchedContributorData, setSearchedContributorData] = useState({
    user: { username: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [headerIsLoading, setHeaderIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(appMode.isLoggedIn);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [authMessage, setAuthMessage] = useState({ type: "", message: "" });
  const [contributorError, setContributorError] = useState({ ref: "", message: "" });
  const history = useHistory();

  const changeAuthMessage = useCallback((authMessage) => {
    setAuthMessage((prevMessage) => {
      return { ...prevMessage, ...authMessage };
    });
  }, []);
  const login_BecomeContributor = useCallback(
    async (location, userData) => {
      setIsLoading((prevState) => {
        return !prevState;
      });
      const response = await sendRequest(`${HOSTURI}/auth/${location}`, {
        method: "POST",
        userData,
      });

      const error = response.error || "";
      const data = response.data || "";
      if (location === "login" && data) {
        setIsLoggedIn((prevState) => {
          return !prevState;
        });
        setUserData((prevData) => {
          return {
            ...data,
          };
        });
        localStorage.setItem(
          "flownews-mode",
          JSON.stringify({
            ...appMode,
            isLoggedIn: true,
            username: data.username,
            token: data.token,
          })
        );
        history.replace("/home");
      }
      if (location === "become-contributor" && data) {
        changeAuthMessage({ type: "success", message: "Account created successfully" });
        setTimeout(() => {
          history.replace("/login");
        }, 800);
      }

      if (error) {
        setAuthMessage((prevMessage) => {
          return { ...prevMessage, type: "error", message: error };
        });
      }
      setIsLoading((prevState) => {
        return !prevState;
      });
    },
    [history, appMode, changeAuthMessage, sendRequest]
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
        setContributorError((prevError) => {
          return { ...prevError, ref: "home", message: error };
        });
      }

      return setHeaderIsLoading((prevState) => {
        return !prevState;
      });
    },
    [sendRequest, token, userData.username]
  );

  const signOutHandler = useCallback(() => {
    setIsLoggedIn((prevState) => {
      return false;
    });
    onCloseProfileBox();
    localStorage.setItem(
      "flownews-mode",
      JSON.stringify({ ...appMode, isLoggedIn: false, token: null, username: null })
    );
    history.replace("/home");
  }, [history, appMode, onCloseProfileBox]);

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
        }
      }
      if (error) {
        setProfileUpdated(false);
        return error;
      }
      return;
    },
    [token, sendRequest, userData]
  );
  return (
    <AuthContext.Provider
      value={{
        HOSTURI,
        token,
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
        onUpdateContributorProfile: (updateProperties) =>
          updateContributorProfileHandler(updateProperties),
        onSetUserData: (data) => {
          setUserData((prevData) => {
            return { ...prevData, ...data };
          });
        },

        onGetContributorData: getContributorData,
        onChangeAuthMessage: (authMessage) => {
          changeAuthMessage(authMessage);
        },
        onResetAuthMessage: resetAuthMessage,
        on_Login_BecomeContributor: login_BecomeContributor,
        onSignOut: signOutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
