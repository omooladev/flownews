import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { dummyContributor } from "../../data";
import { AppContext } from "../App/app-context";

const AuthContextProvider = (props) => {
  const { appMode } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState(appMode.isLoggedIn); //TODO you can change this to true so you are automatically logged in
  const history = useHistory();
  const loginHandler = useCallback(() => {
    setIsLoggedIn((prevState) => {
      return true;
    });
    localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode, isLoggedIn: true }));
    history.replace(`/@${dummyContributor.username}`);
  }, [history, appMode]);

  const signOutHandler = useCallback(() => {
    setIsLoggedIn((prevState) => {
      return false;
    });
    localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode, isLoggedIn: false }));
    history.replace("/home");
  }, [history, appMode]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, onLogin: loginHandler, onSignOut: signOutHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
