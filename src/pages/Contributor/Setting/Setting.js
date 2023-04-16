import { useParams } from "react-router-dom";
import SettingCmp from "../../../components/Contributor/Setting/Setting";
import EditProfile from "./EditProfile/EditProfile";
import EmailSettings from "./Access/EmailSettings";
import styles from "./Setting.module.css";
import ProfileUpdated from "../../../components/Contributor/Setting/EditProfile/UI/ProfileUpdated";
import Appearance from "./Appearance/Appearance";
import PasswordAuthentication from "./Access/PasswordAuthentication";
import Account from "./Account/Account";
import useFetchContributorData from "../../../hooks/useFetchContributorData";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import useNewLocation from "../../../hooks/useNewLocation";

const Setting = () => {
  useFetchContributorData();
  const { contributorData, history } = useContext(AuthContext);
  useNewLocation(history.location.pathname);
  const { path } = useParams();
  return (
    <>
      {contributorData.username && (
        <>
          <ProfileUpdated />
          <section className={styles.setting_page}>
            <SettingCmp />
            <div className={styles.links}>
              {path === "profile" && <EditProfile />}
              {path === "appearance" && <Appearance />}
              {path === "account" && <Account />}
              {path === "email" && <EmailSettings />}
              {path === "security" && <PasswordAuthentication />}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Setting;
