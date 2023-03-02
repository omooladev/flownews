import { useContext } from "react";
import useFetchContributorData from "../../hooks/useFetchContributorData";
import useNewLocation from "../../hooks/useNewLocation";
import { AuthContext } from "../../store/Auth/auth-context";

const Home = () => {
  useFetchContributorData();
  const { history } = useContext(AuthContext);
  useNewLocation(history.location.pathname);

  return;
};

export default Home;
