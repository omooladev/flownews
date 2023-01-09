import { useContext } from "react";
import { AppContext } from "../../store/App/app-context";
import { AuthContext } from "../../store/Auth/auth-context";
import Account from "./Account";
import styles from "./Header.module.css";
import Logo from "./Logo";
import Menu from "./Menu";
import Navigation from "./Navigation";
const Header = () => {
  const { toggleMenu } = useContext(AppContext);
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <header className={`${styles.header} ${toggleMenu ? styles.active : ""}`}>
      <Menu />
      <Logo className={styles.logo} />
      <Navigation className={styles.navigation} />
      {!isLoggedIn && <Account className={styles.account_subscribe} />}
      {/TODO* {isLoggedIn && add header profile box component here } */} 
    </header>
  );
};

export default Header;
