import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/auth-context";
import Notification from "./ContributorNavigations/Notification";
import ProfileBox from "./ContributorNavigations/ProfileBox";
import styles from "./MobileNavigation.module.css";
const MobileNavigation = () => {
  const { isLoggedIn, userData, onSignOut } = useContext(AuthContext);
  const history = useHistory();
  return (
    <div className={styles.for_mobile_only}>
      {!isLoggedIn && (
        <>
          <button
            className={styles.contributor}
            onClick={() => history.replace("/become-contributor")}
          >
            Become a contributor
          </button>

          <button className={styles.login} onClick={() => history.replace("/login")}>
            Login
          </button>
        </>
      )}
      {isLoggedIn && (
        <>
          <ProfileBox
            className={styles.profile_box}
            onClick={() => {
              history.replace(`/@${userData.username}`);
            }}
          />
          <Notification className={styles.notification} />
          <li className={styles.sign_out}>
            <Link to="/" onClick={onSignOut}>
              Sign out
            </Link>
          </li>
        </>
      )}
    </div>
  );
};

export default MobileNavigation;
