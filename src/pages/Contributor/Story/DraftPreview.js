import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import useFetchContributorData from "../../../hooks/useFetchContributorData";
import useNewLocation from "../../../hooks/useNewLocation";
import { useTitle } from "../../../hooks/useTitle";
import DraftPreviewCmp from "../../../components/Contributor/Story/Draft/DraftPreview";

const DraftPreview = () => {
  //----------> fetch contributor data
  useFetchContributorData();
  //----------> access the location
  const location = useLocation();
  //----------> save the location
  useNewLocation(location.pathname);

  //----------> save the title
  useTitle("Preview Draft - FLOWNEWS");

  //----------> get the contributor data
  const { contributorData } = useContext(AuthContext);

// useEffect(() => {
//   document.body.style.backgroundColor="purple"
// }, []);
  return <>{contributorData.username && <DraftPreviewCmp />}</>;
};

export default DraftPreview;
