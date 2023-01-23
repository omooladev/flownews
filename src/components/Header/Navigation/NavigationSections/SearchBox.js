import { useContext, useCallback } from "react";
import { BiX, BiSearch } from "react-icons/bi";
import { AppContext } from "../../../../store/App/app-context";
import SearchField from "../../../../UI/SearchField";
import styles from "./SearchBox.module.css";
const SearchBox = () => {
  const { onToggleSearch, isSearching, onCloseMenu } = useContext(AppContext);
  const onToggleSearchHandler = useCallback(() => {
    onToggleSearch();
  }, [onToggleSearch]);
  return (
    <div className={styles["searchBox"]}>
      <div className={styles.searchToggle} onClick={onToggleSearchHandler}>
        {isSearching && <BiX className={`${styles.icon} ${styles.cancel}`} />}
        {!isSearching && <BiSearch className={`${styles.icon} ${styles.search}`} />}
      </div>
      {isSearching && (
        <div className={styles.searchField}>
          <SearchField className={styles.input} onFocus={onCloseMenu} search={isSearching} />
          <BiSearch className={`${styles.icon} ${styles.search}`} />
        </div>
      )}
    </div>
  );
};

export default SearchBox;
