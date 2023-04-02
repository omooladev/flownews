import { useContext, useEffect } from "react";
import { AppContext } from "../store/App/app-context";
import { AuthContext } from "../store/Auth/auth-context";

const useFetchContributorData = () => {
  const {
    appMode: { isLoggedIn, username },
  } = useContext(AppContext);
  const { onGetContributorData } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn) {
      onGetContributorData(username);
    }
  }, [username, isLoggedIn, onGetContributorData]);
};

export default useFetchContributorData;
