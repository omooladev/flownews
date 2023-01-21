import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { dummyContributor } from "../../data";
import { AppContext } from "../App/app-context";
import useHttp from "../../hooks/useHttp";

//const HOSTURI = "http://localhost:5000/api/v1";
const HOSTURI = "https://flownews-api.onrender.com/api/v1";
const AuthContextProvider = (props) => {
  const { sendRequest } = useHttp();
  const { appMode, onCloseProfileBox } = useContext(AppContext);
  const token = appMode.token;
  const [userData, setUserData] = useState({ username: "" });

  const [searchedContributorData, setSearchedContributorData] = useState({
    user: { username: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(appMode.isLoggedIn);
  const [authMessage, setAuthMessage] = useState({ type: "", message: "" });
  const history = useHistory();
  const loginHandler = useCallback(
    async (userData) => {
      setIsLoading((prevState) => {
        return !prevState;
      });
      const response = await sendRequest(`${HOSTURI}/auth/login`, {
        method: "POST",
        userData,
      });
      const error = (await response.error) || "";
      const data = (await response.data) || "";

      if (data) {
        history.replace(`/@${data.user.username}`);
        setIsLoggedIn((prevState) => {
          return !prevState;
        });
        setUserData((prevData) => {
          return {
            isSearch: null,
            ...data.user,
            token: data.token,
            tokenExpirationTime: data.tokenExpirationTime,
          };
        });
        localStorage.setItem(
          "flownews-mode",
          JSON.stringify({
            ...appMode,
            isLoggedIn: true,
            token: data.token,
          })
        );
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
    [history, appMode, sendRequest]
  );

  const getContributorData = useCallback(
    async (username) => {
      // setIsLoading((prevState) => {
      //   return !prevState;
      // });
      if (!token) {
        return;
      }
      const response = await sendRequest(`${HOSTURI}/@${username}`, {
        method: "GET",
        token,
      });
      //const error = (await response.error) || "";
      const data = (await response.data) || "";

      if (data) {
        const isSearch = data.isSearch || "";
        const user = data.user;
        const tokenExpirationTime = data.tokenExpirationTime;
        //const tokenExpirationTime = data.tokenExpirationTime;
        if (!isSearch) {
          setUserData((prevData) => {
            return { isSearch, ...user, tokenExpirationTime };
          });
        }
        if (isSearch) {
          setSearchedContributorData((prevData) => {
            return { ...prevData, ...data };
          });
        }
      }

      // return setIsLoading((prevState) => {
      //   return !prevState;
      // });
    },
    [sendRequest, token]
  );

  const becomeAContributor = useCallback(() => {}, []);

  const signOutHandler = useCallback(() => {
    setIsLoggedIn((prevState) => {
      return false;
    });
    onCloseProfileBox();
    localStorage.setItem(
      "flownews-mode",
      JSON.stringify({ ...appMode, isLoggedIn: false, token: null })
    );
    history.replace("/home");
  }, [history, appMode, onCloseProfileBox]);

  const changeAuthMessage = useCallback((authMessage) => {
    setAuthMessage((prevMessage) => {
      return { ...prevMessage, ...authMessage };
    });
  }, []);

  const resetAuthMessage = useCallback(() => {
    setAuthMessage((prevMessage) => {
      return { ...prevMessage, type: "", message: "" };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        searchedContributorData,
        isLoading,
        isLoggedIn,
        authMessage,
        onGetContributorData: getContributorData,
        onChangeAuthMessage: (authMessage) => {
          changeAuthMessage(authMessage);
        },
        onResetAuthMessage: resetAuthMessage,
        dummy_contributor_data: dummyContributor,
        onLogin: loginHandler,
        onBecomeAContributor: becomeAContributor,
        onSignOut: signOutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
