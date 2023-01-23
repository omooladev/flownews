import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/auth-context";
import styles from "./MobileNavigation.module.css";
const MobileNavigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
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
    </div>
  );
};

export default MobileNavigation;
