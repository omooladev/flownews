import ProfileBox from "../../../../Header/Navigation/ContributorNavigations/ProfileBox";
import styles from "./ProfilePicture.module.css";

const ProfilePicture = () => {
  return (
    <section className={styles.profile_picture}>
      <p>Profile picture</p>
      <ProfileBox className="UserForm__ProfileBox"/>
      <button>Edit</button>
    </section>
  );
};

export default ProfilePicture;
