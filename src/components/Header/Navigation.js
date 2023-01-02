import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/Auth/auth-context";
import { BiMoon, BiSearch, BiSun, BiX } from "react-icons/bi";
import styles from "./Navigation.module.css";
import { AppContext } from "../../store/App/app-context";
import SearchField from "../../UI/SearchField";
const Navigation = (props) => {
  let className = props.className || "";
  const { appDisplayMode, isSearching, onchangeAppDisplayMode, onToggleSearch } =
    useContext(AppContext);
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
          {appDisplayMode === "light" && <BiMoon className={`${styles.icon} ${styles.moon}`} />}
          {appDisplayMode === "dark" && <BiSun className={`${styles.icon} ${styles.sun}`} />}
        </div>
        <div className={styles.searchBox}>
          <div className={styles.searchToggle} onClick={onToggleSearch}>
            {isSearching && <BiX className={`${styles.icon} ${styles.cancel}`} />}
            {!isSearching && <BiSearch className={`${styles.icon} ${styles.search}`} />}
          </div>
          {isSearching && (
            <div className={styles.searchField}>
              <SearchField className={styles.input} />
              <BiSearch className={`${styles.icon} ${styles.search}`} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
