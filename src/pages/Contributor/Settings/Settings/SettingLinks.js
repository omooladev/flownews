import ProfileBox from "../../../../components/Header/Navigation/ContributorNavigations/ProfileBox";
import SettingNavigationLinks from "../../../../components/Contributor/Setting/SettingNavigationLinks";
import styles from "./SettingLinks.module.css";
const SettingLinks = () => {
  return (
    <section className={styles.setting_links}>
      <ProfileBox className="Setting__ProfileBox" location={"setting"} />
      <SettingNavigationLinks />
    </section>
  );
};

export default SettingLinks;
