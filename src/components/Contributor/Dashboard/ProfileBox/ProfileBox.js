import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import styles from "./ProfileBox.module.css";

const ProfileBox = () => {
  const { onSignOut } = useContext(AuthContext);
  return (
    <details className={styles.details}>
      <summary>Click me</summary>
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
    </details>
  );
};

export default ProfileBox;
