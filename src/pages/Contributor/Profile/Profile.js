import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle";
import useFetchContributorData from "../../../hooks/useFetchContributorData";
import useNewLocation from "../../../hooks/useNewLocation";
import { AuthContext } from "../../../store/Auth/auth-context";
import ProfileCmp from "../../../components/Contributor/Profile/Profile";

const Profile = () => {
  const location = useLocation();
  const username = location.pathname.split("@")[1];
  useFetchContributorData(username);
  useNewLocation("profile");
  useTitle(`${contributorData.username} - FlowNews`);
  const { contributorData } = useContext(AuthContext);

  return <>{contributorData.username && <ProfileCmp />}</>;
};

export default Profile;
