import DarkLight from "./DarkLight";
import SearchBox from "./SearchBox";
import styles from "./DarkLightSearchBox.module.css";
const DarkLightSearchBox = () => {
  return (
    <div className={styles["darkLight-searchBox"]}>
      <DarkLight />
      <SearchBox />
    </div>
  );
};

export default DarkLightSearchBox;
