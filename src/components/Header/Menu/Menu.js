import { useContext, useCallback } from "react";
import { BiMenu } from "react-icons/bi";
import { AppContext } from "../../../store/App/app-context";
import styles from "./Menu.module.css";
const Menu = () => {
  const { onToggleMenu, menuIsActive, isSearching, onCloseSearch } = useContext(AppContext);
  const toggleMenuHandler = useCallback(
    (event) => {
      event.stopPropagation();
      if (isSearching) {
        onCloseSearch();
      }
      onToggleMenu();
    },
    [isSearching, onCloseSearch, onToggleMenu]
  );
  return (
    <BiMenu
      className={`${styles.menu_icon} ${menuIsActive ? styles.active : ""}`}
      onClick={toggleMenuHandler}
    />
  );
};

export default Menu;
