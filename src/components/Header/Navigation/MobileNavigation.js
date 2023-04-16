import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/auth-context";
import Notification from "./ContributorNavigations/Notification";
import ProfileBox from "./ContributorNavigations/ProfileBox";
import styles from "./MobileNavigation.module.css";
const MobileNavigation = (props) => {
  const { onToggleComponentsIsActive } = props;
  const { isLoggedIn, contributorData, onSignOut, history } = useContext(AuthContext);
  const becomeContributorHandler = useCallback(() => {
    onToggleComponentsIsActive({ type: "menu", event: "close" });
    history.replace("/become-contributor");
  }, [history, onToggleComponentsIsActive]);
  const loginHandler = useCallback(() => {
    onToggleComponentsIsActive({ type: "menu", event: "close" });
    history.replace("/login");
  }, [history, onToggleComponentsIsActive]);
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
              onToggleComponentsIsActive({ type: "menu", event: "close" });
              history.replace(`/@${contributorData.username}`);
            }}
          />
          <Notification className={styles.notification} />
          <li className={styles.sign_out}>
            <Link
              to="#"
              onClick={() => {
                onToggleComponentsIsActive({ type: "menu", event: "close" });
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
