import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../store/App/app-context";
import { AuthContext } from "../../../../store/Auth/auth-context";
import ProfileBox from "./ProfileBox";
import Write from "./Write";
import styles from "./ProfileSection.module.css";

const ProfileSection = () => {
  const history = useHistory();
  const {
    componentsIsActive: { profileBoxIsActive },
    onToggleComponentsIsActive,
  } = useContext(AppContext);
  const {
    onSignOut,
    contributorData: {
      username,
      username: contributorFullUsername,
      email: contributorEmailAddress,
    },
  } = useContext(AuthContext);

  const goToPage = useCallback(
    (location) => {
      onToggleComponentsIsActive({ type: "profileBox", event: "close" });
      history.push(location);
    },
    [history, onToggleComponentsIsActive]
  );
  const toggleProfileBoxHandler = useCallback(() => {
    onToggleComponentsIsActive({ type: "profileBox", event: "toggle" });
  }, [onToggleComponentsIsActive]);
  return (
    <section className={styles.profile_section}>
      <ProfileBox className="Header-ProfileSection__ProfileBox" onClick={toggleProfileBoxHandler} />
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
            <li onClick={() => goToPage(`/@${username}`)}>Profile</li>
            <li>Lists</li>
            <li>Stories</li>
            <li>Stats</li>
          </ul>
          <hr />
          <ul className={`${styles["nav-user-list"]}`}>
            <li onClick={() => goToPage("/settings/profile")}>Settings</li>
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
