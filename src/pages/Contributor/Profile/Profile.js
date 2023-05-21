import { useContext } from "react";
import ProfileCmp from "../../../components/Contributor/Profile/Profile";
// import useCloseProfileUpdated from "../../../hooks/useCloseProfileUpdated";
import useFetchContributorData from "../../../hooks/useFetchContributorData";
import { AuthContext } from "../../../store/Auth/auth-context";
import { useTitle } from "../../../hooks/useTitle";
import useNewLocation from "../../../hooks/useNewLocation";
const Profile = () => {
  // useCloseProfileUpdated()
  //note-------->fetches contributor data
  useFetchContributorData();

  //note-------->saves route location
  useNewLocation("profile");

  //note-------->Get contributor Data
  const { contributorData } = useContext(AuthContext);

  //note-------->Save title of this page
  useTitle(`${contributorData.username}`);

  return <>{contributorData.username && <ProfileCmp />}</>;
};

export default Profile;
