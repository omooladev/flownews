import { AuthContext } from "./auth-context";

const AuthContextProvider = (props) => {
  let isLoggedIn = false;
  return <AuthContext.Provider value={{ isLoggedIn }}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
