import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { useTitle } from "../../hooks/useTitle";
import { AuthContext } from "../../store/Auth/auth-context";
import useFetchContributorData from "../../hooks/useFetchContributorData";
import useNewLocation from "../../hooks/useNewLocation";
import NewStoryCmp from "../../components/Contributor/NewStory/NewStory";

const NewStory = () => {
  //----------> fetch contributor data
  useFetchContributorData();
  //----------> access the location
  const location = useLocation();
  //----------> save the location
  useNewLocation(location.pathname);

  //----------> save the title
  useTitle("New Story - FLOWNEWS");

  //----------> get the contributor data
  const { contributorData } = useContext(AuthContext);

  return <>{contributorData.username && <NewStoryCmp />}</>;
};

export default NewStory;
