import ProfileCmp from "../../../components/Contributor/Profile/Profile";
import useFetchContributorData from "../../../hooks/useFetchContributorData";

const Profile = () => {
  useFetchContributorData();

  

  return <ProfileCmp />;
};

export default Profile;
