import { NavLink } from "react-router-dom";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/Auth/auth-context";
import { BiMoon, BiSearch, BiSun, BiX } from "react-icons/bi";

import styles from "./Navigation.module.css";
import { AppContext } from "../../store/App/app-context";
import SearchField from "../../UI/SearchField";
import Logo from "./Logo";

const Navigation = (props) => {
  const history = useHistory();
  let className = props.className || "";
  const {
    appMode,
    
    toggleMenu,
    isSearching,
    
    onToggleMenu,
    onCloseMenu,
    onChangeAppDisplayMode,
    onToggleSearch,
  } = useContext(AppContext);
  const { isLoggedIn } = useContext(AuthContext);

  const toggleAppDisplayMode = useCallback(() => {
    if (appMode.display === "light") {
      return onChangeAppDisplayMode("dark");
    }
    return onChangeAppDisplayMode("light");
  }, [appMode, onChangeAppDisplayMode]);
  const onToggleSearchHandler = useCallback(() => {
    onToggleSearch();
  }, [onToggleSearch]);
  return (
    <nav className={`${className} ${styles.navigation} ${toggleMenu ? styles.active : ""}`}>
      <div className={styles["navigation-list"]}>
        <div className={styles.toggleLogo}>
          <Logo className={styles.logo} />
          <BiX className={`${styles.icon} ${styles.cancel}`} onClick={onToggleMenu} />
        </div>

        <ul>
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
                <NavLink to="/blog" activeClassName={styles["active-link"]}>
                  blog
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

              <div className={styles.for_mobile_only}>
                <button
                  className={styles.contributor}
                  onClick={() => history.push("/auth/become-contributor")}
                >
                  Become a contributor
                </button>

                <button className={styles.login} onClick={() => history.push("/auth/login")}>
                  Login
                </button>
                <div className={styles.darkLight} onClick={toggleAppDisplayMode}>
                  {appMode.display === "light" && (
                    <BiMoon className={`${styles.icon} ${styles.moon}`} />
                  )}
                  {appMode.display === "dark" && (
                    <BiSun className={`${styles.icon} ${styles.sun}`} />
                  )}
                </div>
              </div>
            </>
          )}
        </ul>
      </div>

      <div className={styles["darkLight-searchBox"]}>
        <div className={styles.darkLight} onClick={toggleAppDisplayMode}>
          {appMode.display === "light" && <BiMoon className={`${styles.icon} ${styles.moon}`} />}
          {appMode.display === "dark" && <BiSun className={`${styles.icon} ${styles.sun}`} />}
        </div>
        <div className={styles.searchBox}>
          <div className={styles.searchToggle} onClick={onToggleSearchHandler}>
            {isSearching && <BiX className={`${styles.icon} ${styles.cancel}`} />}
            {!isSearching && <BiSearch className={`${styles.icon} ${styles.search}`} />}
          </div>
          {isSearching && (
            <div className={styles.searchField}>
              <SearchField className={styles.input} onFocus={onCloseMenu} search={isSearching} />
              <BiSearch className={`${styles.icon} ${styles.search}`} />
            </div>
          )}
        </div>
      </div>

     
    </nav>
  );
};

export default Navigation;
