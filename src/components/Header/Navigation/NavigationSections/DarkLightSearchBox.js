import SearchBox from "./SearchBox";
import styles from "./DarkLightSearchBox.module.css";
const DarkLightSearchBox = () => {
  return (
    <div className={styles["darkLight-searchBox"]}>
      <SearchBox />
    </div>
  );
};

export default DarkLightSearchBox;
