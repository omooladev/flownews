import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../store/App/app-context";
import { AuthContext } from "../../../store/Auth/auth-context";
import Notification from "./ContributorNavigations/Notification";
import ProfileBox from "./ContributorNavigations/ProfileBox";
import styles from "./MobileNavigation.module.css";
const MobileNavigation = () => {
  const { onCloseMenu } = useContext(AppContext);
  const { isLoggedIn, userData, onSignOut, history } = useContext(AuthContext);
  const becomeContributorHandler = useCallback(() => {
    onCloseMenu();
    history.replace("/become-contributor");
  }, [history, onCloseMenu]);
  const loginHandler = useCallback(() => {
    onCloseMenu();
    history.replace("/login");
  }, [history, onCloseMenu]);
  return (
    <div className={styles.for_mobile_only}>
      {!isLoggedIn && (
        <>
          <button className={styles.contributor} onClick={becomeContributorHandler}>
            Become a contributor
          </button>
          <button className={styles.login} onClick={loginHandler}>
            Login
          </button>
        </>
      )}
      {isLoggedIn && (
        <>
          <ProfileBox
            className="MobileNavigation__ProfileBox"
            onClick={() => {
              onCloseMenu();
              history.replace(`/@${userData.username}`);
            }}
          />
          <Notification className={styles.notification} />
          <li className={styles.sign_out}>
            <Link
              to="#"
              onClick={() => {
                onCloseMenu();
                onSignOut();
              }}
            >
              Sign out
            </Link>
          </li>
        </>
      )}
    </div>
  );
};

export default MobileNavigation;
