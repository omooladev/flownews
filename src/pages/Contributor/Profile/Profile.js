import ProfileCmp from "../../../components/Contributor/Profile/Profile";
import useCloseProfileUpdated from "../../../hooks/useCloseProfileUpdated";
import useFetchContributorData from "../../../hooks/useFetchContributorData";

const Profile = () => {
  useCloseProfileUpdated();
  useFetchContributorData();

  return <ProfileCmp />;
};

export default Profile;
