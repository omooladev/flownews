//? NOTE---All navigation links here are for the normal users
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

// import styles from "./UserNavigation.module.css";
import styles from "../Navigation.module.css";
const UserNavigation = (props) => {
  const history = useHistory();
  const { isLoggedIn } = props;
  const userLinks = ["home", "news", "blog", "celebrity", "food", "make-up"];
  return (
    <>
      {userLinks.map((link) => {
        return (
          <li>
            <NavLink to={`/${link}`} activeClassName={styles["active-link"]}>
              {link}
            </NavLink>
          </li>
        );
      })}

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
    </>
  );
};

export default UserNavigation;
