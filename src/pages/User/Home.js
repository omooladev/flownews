import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../store/App/app-context";

const Home = () => {
  const location = useLocation();
  const { onSetLastLocation, onCloseMenu } = useContext(AppContext);

  useEffect(() => {
    onSetLastLocation(location.pathname);
  }, [location.pathname, onSetLastLocation]);
  useEffect(() => {
    onCloseMenu();
  }, [onCloseMenu]);
  return;
};

export default Home;
