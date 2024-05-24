import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/Auth/auth-context";
import useFetchContributorData from "../../hooks/useFetchContributorData";
import useNewLocation from "../../hooks/useNewLocation";
import NewContentCmp from "../../components/Contributor/NewContent/NewContent";
const NewContent = () => {
  //----------> fetch contributor data
  useFetchContributorData();
  //----------> access the location
  const location = useLocation();
  //----------> save the location
  useNewLocation(location.pathname);

  //----------> get the contributor data
  const { contributorData } = useContext(AuthContext);

  return <>{contributorData.username && <NewContentCmp />}</>;
};

export default NewContent;
