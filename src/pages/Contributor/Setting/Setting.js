import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../store/App/app-context";
import { AuthContext } from "../../../store/Auth/auth-context";
import SettingCmp from "../../../components/Contributor/Setting/Setting";
import EditProfile from "./EditProfile/EditProfile";
import Email from "./Access/Email";
import styles from "./Setting.module.css";
import ProfileUpdated from "../../../components/Contributor/Setting/EditProfile/UI/ProfileUpdated";
import Appearance from "./Appearance/Appearance";
import PasswordAuthentication from "./Access/PasswordAuthentication";

const Setting = () => {
  const { path } = useParams();
  const {
    appMode: { isLoggedIn, username },
  } = useContext(AppContext);
  const { onGetContributorData, userData } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn) {
      onGetContributorData(username);
    }
  }, [username, isLoggedIn, onGetContributorData]);
  return (
    <>
      {userData.username && (
        <>
          <ProfileUpdated />
          <section className={styles.setting_page}>
            <SettingCmp />
            <div className={styles.links}>
              {path === "profile" && <EditProfile />}
              {path === "appearance" && <Appearance />}
              {path === "email" && <Email />}
              {path === "security" && <PasswordAuthentication />}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Setting;
