import SettingNavigationLinks from "./SettingNavigationLinks";
import ProfileBox from "../../Header/Navigation/ContributorNavigations/ProfileBox";
import styles from "./Setting.module.css";
const Setting = () => {
  return (
    <section className={styles.setting}>
      <ProfileBox className="Setting__ProfileBox" location={"setting"} />
      <SettingNavigationLinks />
    </section>
  );
};

export default Setting;
