import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import SettingNavigationLinks from "./SettingNavigationLinks"
import ProfileBox from "../../Header/Navigation/ContributorNavigations/ProfileBox";
import styles from "./Setting.module.css";
const Setting = () => {
  const { userData } = useContext(AuthContext);
  return (
    <>
      {userData.username && (
        <section className={styles.setting}>
          <ProfileBox className="Setting__ProfileBox" location={"setting"} />
        <SettingNavigationLinks/>
        </section>
      )}
    </>
  );
};

export default Setting;
