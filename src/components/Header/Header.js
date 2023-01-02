import styles from "./Header.module.css";
import Logo from "./Logo";
const Header = () => {
  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <div></div>
      <div></div>
    </header>
  );
};

export default Header;
