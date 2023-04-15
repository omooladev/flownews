import { useContext } from "react";
import ProfileCmp from "../../../components/Contributor/Profile/Profile";
// import useCloseProfileUpdated from "../../../hooks/useCloseProfileUpdated";
import useFetchContributorData from "../../../hooks/useFetchContributorData";
import { AuthContext } from "../../../store/Auth/auth-context";

const Profile = () => {
  // useCloseProfileUpdated();
  useFetchContributorData();
  const { contributorData } = useContext(AuthContext);
  return <>{contributorData.username && <ProfileCmp />}</>;
};

export default Profile;
