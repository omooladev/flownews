import { useCallback, useContext } from "react";
import { AppContext } from "../store/App/app-context";
import { AuthContext } from "../store/Auth/auth-context";
import Routes from "../routes/Routes";

const Main = () => {
  const { onToggleComponentsIsActive } = useContext(AppContext);

  const { lastLocation } = useContext(AuthContext);

  const closeComponentsHandler = useCallback(
    (event) => {
      event.stopPropagation();

      onToggleComponentsIsActive({ event: "*" });
    },
    [onToggleComponentsIsActive]
  );

  //important------->className explanation
  //note----->For the class name, we check current page the user is on,
  //note----->and if this page is the profile page then we add a class name of profile_page.
  //note----->This is because we want to add configure some extra settings
 
  return (
    <>
      <main
        className={`main  ${lastLocation === "profile" ? "profile_page" : ""}`}
        onClick={closeComponentsHandler}
      >
        <Routes />
      </main>
    </>
  );
};

export default Main;
