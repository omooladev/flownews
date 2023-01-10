import { useContext } from "react";
import { AppContext } from "../../../../store/App/app-context";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { FaChevronDown } from "react-icons/fa";
import styles from "./ProfileBox.module.css";

const ProfileBox = () => {
  const { profileBoxIsActive, onToggleProfileBox } = useContext(AppContext);
  const { onSignOut, dummy_contributor_data } = useContext(AuthContext);
  const contributorProfilePicture = dummy_contributor_data.profile_picture;
  const contributorUsername = dummy_contributor_data.username[0];

  return (
    <section className={styles.details}>
      <div onClick={onToggleProfileBox} className={styles.profile_box}>
        {contributorProfilePicture ? (
          <img
            src={contributorProfilePicture}
            alt="contributor"
            className={styles.contributor_profile_picture}
          />
        ) : (
          <p>{contributorUsername}</p>
        )}
        <FaChevronDown className={styles.icon} />
      </div>

      {profileBoxIsActive && (
        <nav className={`${styles["nav-user"]}`}>
          <ul className={`${styles["nav-user-list"]}`}>
            <li>Profile</li>
            <li>Lists</li>
            <li>Stories</li>
            <li>Stats</li>
          </ul>
          <hr />
          <ul className={`${styles["nav-user-list"]}`}>
            <li>Settings</li>
            <li>Refine recommendations</li>
            <li>Manage publications</li>
          </ul>
          <hr />
          <ul className={`${styles["nav-user-list"]}`}>
            <li>Become a member</li>
            <li>Apply to the partner program</li>
            <li>Gift a membership</li>
          </ul>
          <hr />
          <ul className={`${styles["nav-user-list"]}`}>
            <li onClick={onSignOut}>Sign out</li>
          </ul>
        </nav>
      )}
    </section>
  );
};

export default ProfileBox;
