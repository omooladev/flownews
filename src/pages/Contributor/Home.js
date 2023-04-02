import useFetchContributorData from "../../hooks/useFetchContributorData";
import useNewLocation from "../../hooks/useNewLocation";
import { useLocation } from "react-router-dom";
import DummyNews from "../../components/DummyNews/dummy_news"
const Home = () => {
  useFetchContributorData();
  const location = useLocation();
  useNewLocation(location.pathname);

  return <DummyNews/>
};

export default Home;
