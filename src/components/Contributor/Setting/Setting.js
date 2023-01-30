import ProfileBox from "../../Header/Navigation/ContributorNavigations/ProfileBox";
import styles from "./Setting.module.css"
const Setting = () => {
  return (
    <section className={styles.setting}>
      <ProfileBox className={styles.profile_box} location={"setting"}/>
    </section>
  );
};

export default Setting;
