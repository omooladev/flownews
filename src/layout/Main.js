import { useCallback, useContext } from "react";
import Routes from "../routes/Routes";
import { AppContext } from "../store/App/app-context";
import { AuthContext } from "../store/Auth/auth-context";

const Main = () => {
  const {
    onCloseMenu,
    onCloseProfileBox,
    profileBoxIsActive,
    menuIsActive,
    isSearching,
    onCloseSearch,
  } = useContext(AppContext);

  const { profileUpdated } = useContext(AuthContext);

  const closeComponentsHandler = useCallback(
    (event) => {
      event.stopPropagation();
      if (isSearching) {
        onCloseSearch();
      }
      if (profileBoxIsActive) {
        onCloseProfileBox();
      }
      if (menuIsActive) {
        onCloseMenu();
      }
    },
    [onCloseProfileBox, onCloseMenu, profileBoxIsActive, menuIsActive]
  );
  return (
    <main
      className={`main ${profileUpdated ? "profile_updated" : ""}`}
      onClick={closeComponentsHandler}
    >
      eeeev3 3 3 3 3
      <Routes />
    </main>
  );
};

export default Main;
