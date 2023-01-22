import { NavLink } from "react-router-dom";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/Auth/auth-context";
import { BiSearch, BiX } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";

import styles from "./Navigation.module.css";
import { AppContext } from "../../store/App/app-context";
import SearchField from "../../UI/SearchField";
import Logo from "./Logo";
import ProfileBox from "../Contributor/Dashboard/ProfileSection/ProfileBox";

const Navigation = (props) => {
  const history = useHistory();
  let className = props.className || "";
  const {
    toggleMenu,

    isSearching,

    onToggleMenu,
    onCloseMenu,

    onToggleSearch,
  } = useContext(AppContext);
  const { isLoggedIn, dummy_contributor_data } = useContext(AuthContext);

  // const toggleAppDisplayMode = useCallback(() => {
  //   if (appMode.display === "light") {
  //     return onChangeAppDisplayMode("dark");
  //   }
  //   return onChangeAppDisplayMode("light");
  // }, [appMode, onChangeAppDisplayMode]);
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

            {/* <div className={styles.darkLight} onClick={toggleAppDisplayMode}>
              {appMode.display === "light" && (
                <BiMoon className={`${styles.icon} ${styles.moon}`} />
              )}
              {appMode.display === "dark" && <BiSun className={`${styles.icon} ${styles.sun}`} />}
            </div> */}
          </div>

          {isLoggedIn && (
            <>
              <ProfileBox
                className={styles.profile_box}
                onClick={() => {
                  history.replace(`/@${dummy_contributor_data.username}`);
                }}
              />
              <li className={styles.notification}>
                <NavLink to="/me/notifications">
                  <FaRegBell className={styles.icon} />
                </NavLink>
              </li>
              <li className={styles.sign_out}>
                <NavLink to="/signout">Sign out</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className={styles["darkLight-searchBox"]}>
        {/* <div className={styles.darkLight} onClick={toggleAppDisplayMode}>
          {appMode.display === "light" && <BiMoon className={`${styles.icon} ${styles.moon}`} />}
          {appMode.display === "dark" && <BiSun className={`${styles.icon} ${styles.sun}`} />}
        </div> */}
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
