import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileCmp from "../../../components/Contributor/Profile/Profile";
import { AppContext } from "../../../store/App/app-context";
import { AuthContext } from "../../../store/Auth/auth-context";
const Profile = () => {
  const { username } = useParams();
  const {
    appMode: { isLoggedIn },
  } = useContext(AppContext);
  const { onGetContributorData } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn) {
      onGetContributorData(username);
    }
  }, [username, isLoggedIn, onGetContributorData]);

  return <ProfileCmp />;
};

export default Profile;
