import { useCallback, useContext } from "react";
import { BiX, BiSearch } from "react-icons/bi";
import { AppContext } from "../../../../store/App/app-context";
import SearchField from "./SearchField";
import styles from "./SearchBox.module.css";
const SearchBox = () => {
  const { onToggleSearch, isSearching } = useContext(AppContext);
  const toggleSearchHandler = useCallback(
    (event) => {
      event.stopPropagation();
      onToggleSearch();
    },
    [onToggleSearch]
  );

  return (
    <div className={styles["searchBox"]}>
      <div className={styles.searchToggle} onClick={toggleSearchHandler}>
        {isSearching && <BiX className={`${styles.icon} ${styles.cancel}`} />}
        {!isSearching && <BiSearch className={`${styles.icon} ${styles.search}`} />}
      </div>
      {isSearching && (
        <div className={styles.searchField}>
          <SearchField className={styles.input} search={isSearching} />
          <BiSearch className={`${styles.icon} ${styles.search}`} />
        </div>
      )}
    </div>
  );
};

export default SearchBox;
