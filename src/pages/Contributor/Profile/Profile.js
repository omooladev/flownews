import ProfileCmp from "../../../components/Contributor/Profile/Profile";
import useCloseProfileUpdated from "../../../hooks/useCloseProfileUpdated";
import useFetchContributorData from "../../../hooks/useFetchContributorData";

const Profile = () => {
  useFetchContributorData();
  useCloseProfileUpdated();

  return <ProfileCmp />;
};

export default Profile;
