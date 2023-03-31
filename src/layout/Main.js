import { useCallback, useContext } from "react";
import Routes from "../routes/Routes";
import { AppContext } from "../store/App/app-context";
import { AuthContext } from "../store/Auth/auth-context";
import Dummy_news from "../components/DummyNews/dummy_news";

const Main = () => {
  const { onToggleComponentsIsActive } = useContext(AppContext);

  const { profileUpdated } = useContext(AuthContext);

  const closeComponentsHandler = useCallback((event) => {
    event.stopPropagation();
    onToggleComponentsIsActive({ event: "*" });
  }, []);
  return (
    <main
      className={`main ${profileUpdated ? "profile_updated" : ""}`}
      onClick={closeComponentsHandler}
    >
      <Dummy_news />
      <Routes />
    </main>
  );
};

export default Main;
