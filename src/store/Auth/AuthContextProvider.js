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
  const [isLoggedIn, setIsLoggedIn] = useState(appMode.isLoggedIn);
  const [authMessage, setAuthMessage] = useState({ type: "", message: "" });
  const history = useHistory();
  const loginHandler = useCallback(
    async (data) => {
      const response = await sendRequest(`${HOSTURI}/auth/login`, { method: "POST", data });
      return;
      setIsLoggedIn((prevState) => {
        return true;
      });
      localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode, isLoggedIn: true }));
      history.replace(`/@${dummyContributor.username}`);
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
