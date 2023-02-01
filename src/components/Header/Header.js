import { useContext } from "react";
import { AppContext } from "../../store/App/app-context";
import { AuthContext } from "../../store/Auth/auth-context";
import AccountSubscribe from "./Navigation/NavigationSections/AccountSubscribe";
import Logo from "../../UI/Logo";
import Menu from "./Menu/Menu";
import Navigation from "./Navigation/Navigation";
// import SuspenseLoader from "../Loaders/SuspenseLoader";
import styles from "./Header.module.css";
import SuspenseLoader from "../Loaders/SuspenseLoader";
const Header = () => {
  const { toggleMenu } = useContext(AppContext);
  const { isLoggedIn, contributorError, headerIsLoading, userData } = useContext(AuthContext);
  return (
    <>
      {(userData.username || !isLoggedIn) && !contributorError.ref && (
        <header className={`${styles.header} ${toggleMenu ? styles.active : ""}`}>
          <Menu />
          {/* <SuspenseLoader/> */}
          <Logo className={styles.logo} />
          <Navigation className={styles.navigation} />
          {!isLoggedIn && <AccountSubscribe className={styles.account_subscribe} />}
        </header>
      )}
      {!headerIsLoading && contributorError.ref && (
        <p className={`error ${styles.error}`}>{contributorError.message}</p>
      )}
      {headerIsLoading && <SuspenseLoader />}
    </>
  );
};

export default Header;
