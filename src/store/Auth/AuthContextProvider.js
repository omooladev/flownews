import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { dummyContributor } from "../../data";
import { AppContext } from "../App/app-context";
import useHttp from "../../hooks/useHttp";

const HOSTURI = "http://localhost:5000/api/v1";
const AuthContextProvider = (props) => {
  const { sendRequest } = useHttp();
  const { appMode } = useContext(AppContext);
  const token = appMode.token;
  const [userData, setUserData] = useState({ user: { username: "" } });
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
        setUserData((prevData) => {
          return { ...prevData, ...data };
        });
        setIsLoggedIn((prevState) => {
          return !prevState;
        });
        localStorage.setItem(
          "flownews-mode",
          JSON.stringify({
            ...appMode,
            username: data.user.username,
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
  const becomeAContributor = useCallback(() => {}, []);

  const signOutHandler = useCallback(() => {
    setIsLoggedIn((prevState) => {
      return false;
    });
    localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode, isLoggedIn: false }));
    history.replace("/home");
  }, [history, appMode]);

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
        isLoading,
        isLoggedIn,
        authMessage,
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
