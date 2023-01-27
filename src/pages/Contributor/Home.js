import { useContext, useEffect } from "react";
import { AppContext } from "../../store/App/app-context";
import { AuthContext } from "../../store/Auth/auth-context";
const Home = () => {
  const {
    appMode: { isLoggedIn, username },
    onCloseMenu,
    toggleMenu,
  } = useContext(AppContext);
  const { onGetContributorData } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn) {
      onGetContributorData(username);
    }
  }, [username, isLoggedIn, onGetContributorData, toggleMenu, onCloseMenu]);
  return;
};

export default Home;
