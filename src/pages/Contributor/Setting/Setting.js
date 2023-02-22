import { useParams } from "react-router-dom";
import SettingCmp from "../../../components/Contributor/Setting/Setting";
import EditProfile from "./EditProfile/EditProfile";
import Email from "./Access/Email";
import styles from "./Setting.module.css";
import ProfileUpdated from "../../../components/Contributor/Setting/EditProfile/UI/ProfileUpdated";
import Appearance from "./Appearance/Appearance";
import PasswordAuthentication from "./Access/PasswordAuthentication";
import Account from "./Account/Account";
import useFetchContributorData from "../../../hooks/useFetchContributorData";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";

const Setting = () => {
  useFetchContributorData();
  const { userData } = useContext(AuthContext);
  const { path } = useParams();
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
              {path === "account" && <Account />}
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
