import useFetchContributorData from "../../hooks/useFetchContributorData";
import useNewLocation from "../../hooks/useNewLocation";
import { useLocation } from "react-router-dom";
import DummyNews from "../../components/DummyNews/dummy_news";
import { useContext } from "react";
import { AuthContext } from "../../store/Auth/auth-context";
const Home = () => {
  
  useFetchContributorData();
  const location = useLocation();
  useNewLocation(location.pathname);
  const { contributorData } = useContext(AuthContext);
  return <>{contributorData.username && <DummyNews />}</>;
};

export default Home;
