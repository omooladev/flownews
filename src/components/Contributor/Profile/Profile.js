import ProfileBox from "../../Header/Navigation/ContributorNavigations/ProfileBox";
import styles from "./Profile.module.css";
const Profile = () => {
  return (
    <section className={`main-container ${styles.profile}`}>
      <ProfileBox />
    </section>
  );
};

export default Profile;
