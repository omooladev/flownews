import { useCallback, useContext } from "react";
import Routes from "../routes/Routes";
import { AppContext } from "../store/App/app-context";
const Main = () => {
  const { onCloseMenu, onCloseProfileBox, profileBoxIsActive,toggleMenu } = useContext(AppContext);
  const closeComponentsHandler = useCallback(() => {
    if (profileBoxIsActive) {
      onCloseProfileBox();
    }
    if(toggleMenu){
      onCloseMenu()
    }
  }, [onCloseProfileBox,onCloseMenu,profileBoxIsActive,toggleMenu]);
  return (
    <main className="main" onClick={closeComponentsHandler}>
      <Routes />
    </main>
  );
};

export default Main;
