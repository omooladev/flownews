import { useContext } from "react";
import Routes from "../routes/Routes";
import { AppContext } from "../store/App/app-context";
const Main = () => {
  const { onCloseMenu } = useContext(AppContext);
  return (
    <main className="main" onClick={onCloseMenu}>
      <Routes />
    </main>
  );
};

export default Main;
