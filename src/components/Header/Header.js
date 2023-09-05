import styles from "./Header.module.css";
import { useContext } from "react";
import { AppContext } from "../../store/App/app-context";
import { AuthContext } from "../../store/Auth/auth-context";
import AccountSubscribe from "./Navigation/NavigationSections/AccountSubscribe";
import Logo from "../../UI/Logo";
import Menu from "./Menu/Menu";
import Navigation from "./Navigation/Navigation";
import SuspenseLoader from "../Loaders/SuspenseLoader";

const Header = () => {
  const {
    componentsIsActive: { menuIsActive },
  } = useContext(AppContext);
  const { isLoggedIn, contributorError, pageIsLoading, contributorData } = useContext(AuthContext);

  return (
    <>
      {(contributorData.username || !isLoggedIn) && !contributorError.ref && (
        <header className={`${styles.header} ${menuIsActive ? styles.menu_active : ""}`}>
          <Menu />
          <Logo className={styles.logo} />
          <Navigation className={styles.navigation} />
          {!isLoggedIn && <AccountSubscribe className={styles.account_subscribe} />}
        </header>
      )}
      {!pageIsLoading && contributorError.ref && (
        <p className={`error ${styles.error}`}>{contributorError.message}</p>
      )}
      {pageIsLoading && <SuspenseLoader />}
    </>
  );
};

export default Header;
