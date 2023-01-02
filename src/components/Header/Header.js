import styles from "./Header.module.css";
import Logo from "./Logo";
import Navigation from "./Navigation";
const Header = () => {
  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <Navigation className={styles.navigation} />
      <div></div>
    </header>
  );
};

export default Header;
