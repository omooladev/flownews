import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { AppContext } from "../../../store/App/app-context";
import styles from "./Menu.module.css";
const Menu = () => {
  const { onToggleMenu, menuIsActive } = useContext(AppContext);
  return (
    <BiMenu
      className={`${styles.menu_icon} ${menuIsActive ? styles.active : ""}`}
      onClick={onToggleMenu}
    />
  );
};

export default Menu;
