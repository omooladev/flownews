import { useContext } from "react";
import ProfileCmp from "../../../components/Contributor/Profile/Profile";
// import useCloseProfileUpdated from "../../../hooks/useCloseProfileUpdated";
import useFetchContributorData from "../../../hooks/useFetchContributorData";
import { AuthContext } from "../../../store/Auth/auth-context";
import { useTitle } from "../../../hooks/useTitle";
import useNewLocation from "../../../hooks/useNewLocation";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const location = useLocation();
  //----------> get the username in the uri
  const username = location.pathname.split("@")[1];

  // useCloseProfileUpdated()
  //---------->fetches contributor data
  useFetchContributorData(username);

  //note-------->saves route location
  useNewLocation("profile");

  //note-------->Get contributor Data
  const { contributorData } = useContext(AuthContext);

  //note-------->Save title of this page
  useTitle(`${contributorData.username} - FlowNews`);

  return <>{contributorData.username && <ProfileCmp />}</>;
};

export default Profile;
