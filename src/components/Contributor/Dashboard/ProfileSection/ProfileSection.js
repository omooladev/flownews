import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../../store/App/app-context";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { FaEdit } from "react-icons/fa";

import styles from "./ProfileSection.module.css";
import ProfileBox from "./ProfileBox";

const ProfileSection = () => {
  const { profileBoxIsActive, onToggleProfileBox } = useContext(AppContext);
  const { onSignOut, userData } = useContext(AuthContext);

  const contributorFullUsername = userData.user.username;
  const contributorEmailAddress = userData.user.email;

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
            <li className={styles.write}>
              <NavLink to="/new-story">
                <FaEdit className={styles.icon} />
                <p>Write</p>
              </NavLink>
            </li>
          </ul>
          <hr className={styles.write_line} />
          <ul className={`${styles["nav-user-list"]}`}>
            <li>Profile</li>
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
