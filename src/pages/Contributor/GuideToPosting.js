import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { useTitle } from "../../hooks/useTitle";
import { AuthContext } from "../../store/Auth/auth-context";
import useFetchContributorData from "../../hooks/useFetchContributorData";
import useNewLocation from "../../hooks/useNewLocation";
import GuideToPostingCmp from "../../components/Contributor/GuideToPosting/GuideToPosting";

const GuideToPosting = () => {
  //----------> fetch contributor data
  useFetchContributorData();
  //----------> access the location
  const location = useLocation();
  //----------> save the location
  useNewLocation(location.pathname);

  //----------> save the title
  useTitle("A guide to posting");

  //----------> get the contributor data
  const { contributorData } = useContext(AuthContext);

  return <>{contributorData.username && <GuideToPostingCmp/>}</>;
};

export default GuideToPosting;
