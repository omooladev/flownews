import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { dummyContributor } from "../../data";
import { AppContext } from "../App/app-context";

const AuthContextProvider = (props) => {
  const { appMode } = useContext(AppContext);
<<<<<<< HEAD
  const [isLoggedIn, setIsLoggedIn] = useState(appMode.isLoggedIn);
=======
  const [isLoggedIn, setIsLoggedIn] = useState(appMode.isLoggedIn); //TODO you can change this to true so you are automatically logged in
>>>>>>> f1184c671466804f87e8b6c7d1b92992cf3e8eec
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
<<<<<<< HEAD
    <AuthContext.Provider
      value={{
        isLoggedIn,
        dummy_contributor_data: dummyContributor,
        onLogin: loginHandler,
        onSignOut: signOutHandler,
      }}
    >
=======
    <AuthContext.Provider value={{ isLoggedIn, onLogin: loginHandler, onSignOut: signOutHandler }}>
>>>>>>> f1184c671466804f87e8b6c7d1b92992cf3e8eec
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
