import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/Auth/auth-context";
import { BiMoon, BiSearch, BiSun, BiX } from "react-icons/bi";
import styles from "./Navigation.module.css";
import { AppContext } from "../../store/App/app-context";
const Navigation = (props) => {
  let className = props.className || "";
  const { appDisplayMode, onchangeAppDisplayMode } = useContext(AppContext);
  const { isLoggedIn } = useContext(AuthContext);

  const toggleAppDisplayMode = () => {
    if (appDisplayMode === "light") {
      return onchangeAppDisplayMode("dark");
    }
    return onchangeAppDisplayMode("light");
  };
  return (
    <nav className={`${className} ${styles.navigation}`}>
      <ul className={styles["navigation-list"]}>
        {!isLoggedIn && (
          <>
            <li>
              <NavLink to="/home" activeClassName={styles["active-link"]}>
                home
              </NavLink>
            </li>
            <li>
              <NavLink to="/news" activeClassName={styles["active-link"]}>
                news
              </NavLink>
            </li>
            <li>
              <NavLink to="/travel" activeClassName={styles["active-link"]}>
                travel
              </NavLink>
            </li>
            <li>
              <NavLink to="/celebrity" activeClassName={styles["active-link"]}>
                celebrity
              </NavLink>
            </li>
            <li>
              <NavLink to="/food" activeClassName={styles["active-link"]}>
                food
              </NavLink>
            </li>
            <li>
              <NavLink to="/make-up" activeClassName={styles["active-link"]}>
                make-up
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div className={styles["darkLight-searchBox"]}>
        <div className={styles.darkLight} onClick={toggleAppDisplayMode}>
          {appDisplayMode === "light" && <BiMoon className={`${styles.icon} moon`} />}
          {appDisplayMode === "dark" && <BiSun className={`${styles.icon} sun`} />}
        </div>
        <div className={styles.searchBox}>
          <BiSearch className={`${styles.icon} search`} />
          <BiX className={`${styles.icon} cancel`} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
