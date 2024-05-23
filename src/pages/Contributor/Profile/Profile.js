import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle";
import useFetchContributorData from "../../../hooks/useFetchContributorData";
import useNewLocation from "../../../hooks/useNewLocation";
import { AuthContext } from "../../../store/Auth/auth-context";
import ProfileCmp from "../../../components/Contributor/Profile/Profile";

const Profile = () => {
  const location = useLocation();
  //----------> get the username in the uri
  const username = location.pathname.split("@")[1];

  //---------->fetches contributor data
  useFetchContributorData(username);

  useNewLocation("profile");

  //note-------->Get contributor Data
  const { contributorData } = useContext(AuthContext);

  //note-------->Save title of this page
  useTitle(`${contributorData.username} - FlowNews`);

  return <>{contributorData.username && <ProfileCmp />}</>;
};

export default Profile;
