import { useContext } from "react";
import { BiX } from "react-icons/bi";
import { AppContext } from "../../../store/App/app-context";
import { AuthContext } from "../../../store/Auth/auth-context";
import Logo from "../../../UI/Logo";
import UserNavigation from "./UserNavigation";
import ContributorNavigation from "./ContributorNavigations/ContributorNavigation";
import SearchBox from "./NavigationSections/SearchBox";
import styles from "./Navigation.module.css";
const Navigation = (props) => {
  let className = props.className || "";
  const { menuIsActive, onToggleMenu } = useContext(AppContext);
  const { isLoggedIn, userData } = useContext(AuthContext);

  // const toggleAppDisplayMode = useCallback(() => {
  //   if (appMode.display === "light") {
  //     return onChangeAppDisplayMode("dark");
  //   }
  //   return onChangeAppDisplayMode("light");
  // }, [appMode, onChangeAppDisplayMode]);

  return (
    <nav className={`${className} ${styles.navigation} ${menuIsActive ? styles.active : ""}`}>
      <section className={styles["navigation-section"]}>
        <div className={styles.toggleLogo}>
          <Logo className={styles.logo} />
          <BiX className={`${styles.icon} ${styles.cancel}`} onClick={onToggleMenu} />
        </div>
        <ul className={styles["navigation-list"]}>
          <UserNavigation isLoggedIn={isLoggedIn} />
        </ul>
      </section>
      <SearchBox />
      {isLoggedIn && <ContributorNavigation isLoggedIn={isLoggedIn} userData={userData} />}
    </nav>
  );
};

export default Navigation;
