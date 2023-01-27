import { useCallback, useContext } from "react";
import { AppContext } from "../../../../store/App/app-context";
import { AuthContext } from "../../../../store/Auth/auth-context";

import styles from "./ProfileSection.module.css";
import ProfileBox from "./ProfileBox";
import { useHistory } from "react-router-dom";
import Write from "./Write";

const ProfileSection = () => {
  const history = useHistory();
  const { profileBoxIsActive, onToggleProfileBox, onCloseProfileBox } = useContext(AppContext);
  const { onSignOut, userData } = useContext(AuthContext);

  const contributorFullUsername = userData.username;
  const contributorEmailAddress = userData.email;
  const viewProfilePage = useCallback(() => {
    if (profileBoxIsActive) {
      onCloseProfileBox();
    }
    history.push(`/@${userData.username}`);
  }, [history, onCloseProfileBox, profileBoxIsActive, userData]);
  return (
    <section className={styles.profile_section}>
      <ProfileBox className={styles.profile_box} onClick={onToggleProfileBox} />
      {profileBoxIsActive && (
        <nav className={`${styles["nav-user"]}`}>
          <ul className={`${styles["nav-user-list"]}`}>
            <p className={styles.signed_in_as}>Signed in as</p>
            <label className={styles.username}>{contributorFullUsername}</label>
          </ul>
          <hr />
          <ul className={`${styles["nav-user-list"]}`}>
            <Write className={styles.write} />
          </ul>
          <hr className={styles.write_line} />
          <ul className={`${styles["nav-user-list"]}`}>
            <li onClick={viewProfilePage}>Profile</li>
            <li>Lists</li>
            <li>Stories</li>
            <li>Stats</li>
          </ul>
          <hr />
          <ul className={`${styles["nav-user-list"]}`}>
            <li>Settings</li>
            <li>Manage publications</li>
          </ul>
          <hr />
          <ul className={`${styles["nav-user-list"]}`}>
            <li>Become a member</li>
          </ul>
          <hr />
          <ul className={`${styles["nav-user-list"]}`}>
            <li onClick={onSignOut} className={styles.sign_out}>
              Sign out
            </li>
            <label onClick={onSignOut} className={styles.email}>
              {contributorEmailAddress}
            </label>
          </ul>
        </nav>
      )}
    </section>
  );
};

export default ProfileSection;
