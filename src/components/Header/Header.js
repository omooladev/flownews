import { useContext } from "react";
import { AppContext } from "../../store/App/app-context";
import { AuthContext } from "../../store/Auth/auth-context";
import AccountSubscribe from "./Navigation/NavigationSections/AccountSubscribe";
import Logo from "../../UI/Logo";
import Menu from "./Menu/Menu";
import Navigation from "./Navigation/Navigation";
// import SuspenseLoader from "../Loaders/SuspenseLoader";
import styles from "./Header.module.css";
const Header = () => {
  const { toggleMenu } = useContext(AppContext);
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <header className={`${styles.header} ${toggleMenu ? styles.active : ""}`}>
      <Menu />
      {/* <SuspenseLoader/> */}
      <Logo className={styles.logo} />
      <Navigation className={styles.navigation} />
      {!isLoggedIn && <AccountSubscribe className={styles.account_subscribe} />}
    </header>
  );
};

export default Header;
