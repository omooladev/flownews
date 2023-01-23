import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { AppContext } from "../../../store/App/app-context";
import styles from "./Menu.module.css";
const Menu = () => {
  const { onToggleMenu, toggleMenu } = useContext(AppContext);
  return (
    <BiMenu
      className={`${styles.menu_icon} ${toggleMenu ? styles.active : ""}`}
      onClick={onToggleMenu}
    />
  );
};

export default Menu;
