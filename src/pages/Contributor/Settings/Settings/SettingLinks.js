import ProfileBox from "../../../../UI/ProfileBox";
import SettingNavigationLinks from "../../../../components/Contributor/Setting/SettingNavigationLinks";
import styles from "./SettingLinks.module.css";
const SettingLinks = () => {
  return (
    <section className={styles.setting_links}>
      <ProfileBox
        className="Setting__ProfileBox"
        options={{ showUsername: true, showText: true, showYourPersonalAccountText: true }}
      />
      <SettingNavigationLinks />
    </section>
  );
};

export default SettingLinks;
