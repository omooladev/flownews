import { useContext } from "react";
import { AppContext } from "../../store/App/app-context";
import Account from "./Account";
import styles from "./Header.module.css";
import Logo from "./Logo";
import Menu from "./Menu";
import Navigation from "./Navigation";
const Header = () => {
  const { toggleMenu } = useContext(AppContext);
  return (
    <header className={`${styles.header} ${toggleMenu ? styles.active : ""}`}>
      <Menu />
      <Logo className={styles.logo} />
      <Navigation className={styles.navigation} />
      <Account className={styles.account_subscribe} />
    </header>
  );
};

export default Header;
