import { useLocation } from "react-router-dom";
import useNewLocation from "../../hooks/useNewLocation";

const Home = () => {
  const location = useLocation();
  useNewLocation(location.pathname);
  return <div></div>;
};

export default Home;
