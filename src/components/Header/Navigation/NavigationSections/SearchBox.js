import { useCallback, useContext } from "react";
import { BiX, BiSearch } from "react-icons/bi";
import { AppContext } from "../../../../store/App/app-context";
import SearchField from "./SearchField";
import styles from "./SearchBox.module.css";
const SearchBox = () => {
  const {
    componentsIsActive: { searchFieldIsActive },
    onToggleComponentsIsActive,
  } = useContext(AppContext);
  const toggleSearchHandler = useCallback(
    (event) => {
      event.stopPropagation();
      onToggleComponentsIsActive({ type: "searchField", event: "close" });
    },
    [onToggleComponentsIsActive]
  );

  return (
    <div className={styles["searchBox"]}>
      <div className={styles.searchToggle} onClick={toggleSearchHandler}>
        {searchFieldIsActive && <BiX className={`${styles.icon} ${styles.cancel}`} />}
        {!searchFieldIsActive && <BiSearch className={`${styles.icon} ${styles.search}`} />}
      </div>
      {searchFieldIsActive && (
        <div className={styles.searchField}>
          <SearchField className={styles.input} search={searchFieldIsActive} />
          <BiSearch className={`${styles.icon} ${styles.search}`} />
        </div>
      )}
    </div>
  );
};

export default SearchBox;
