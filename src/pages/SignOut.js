import { useContext, useEffect } from "react";
import { AuthContext } from "../store/Auth/auth-context";

const SignOut = () => {
  const { onSignOut, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn) {
      onSignOut();
    }
  }, [isLoggedIn, onSignOut]);
  return;
};

export default SignOut;
