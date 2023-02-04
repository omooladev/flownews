import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../store/App/app-context";
import { AuthContext } from "../../../store/Auth/auth-context";
import SettingCmp from "../../../components/Contributor/Setting/Setting";
import EditProfile from "./EditProfile/EditProfile";
import Email from "./Access/Email/Email";
import styles from "./Setting.module.css";

const Setting = () => {
  const { path } = useParams();

  const {
    appMode: { isLoggedIn, username },
  } = useContext(AppContext);
  const { onGetContributorData,userData } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn) {
      onGetContributorData(username);
    }
  }, [username, isLoggedIn, onGetContributorData]);
  return (
    <>
      {userData.username && (
        <section className={styles.setting_page}>
          <SettingCmp />
          {path === "profile" && <EditProfile />}
          {path === "email" && <Email />}
        </section>
      )}
    </>
  );
};

export default Setting;
