import { useCallback, useContext } from "react";
import { BiX, BiSearch } from "react-icons/bi";
import { AppContext } from "../../../../store/App/app-context";
import SearchField from "../../../../UI/SearchField";
import styles from "./SearchBox.module.css";
const SearchBox = () => {
  const { onToggleSearch, isSearching, onCloseMenu, menuIsActive } = useContext(AppContext);
  const toggleSearchHandler = useCallback(
    (event) => {
      event.stopPropagation();
      if (menuIsActive) {
        onCloseMenu();
      }
      onToggleSearch();
    },
    [menuIsActive, onToggleSearch, onCloseMenu]
  );
  const closeMenuHandler = useCallback(() => {
    if (menuIsActive) {
      onCloseMenu();
    }
  }, [menuIsActive, onCloseMenu]);
  return (
    <div className={styles["searchBox"]}>
      <div className={styles.searchToggle} onClick={toggleSearchHandler}>
        {isSearching && <BiX className={`${styles.icon} ${styles.cancel}`} />}
        {!isSearching && <BiSearch className={`${styles.icon} ${styles.search}`} />}
      </div>
      {isSearching && (
        <div className={styles.searchField}>
          <SearchField className={styles.input} onFocus={closeMenuHandler} search={isSearching} />
          <BiSearch className={`${styles.icon} ${styles.search}`} />
        </div>
      )}
    </div>
  );
};

export default SearchBox;
