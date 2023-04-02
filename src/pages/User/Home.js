import { useLocation } from "react-router-dom";
import useNewLocation from "../../hooks/useNewLocation";
import DummyNews from "../../components/DummyNews/dummy_news";

const Home = () => {
  const location = useLocation();
  useNewLocation(location.pathname);
  return <DummyNews/>;
};

export default Home;
