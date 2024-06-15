import { BsThreeDots } from "react-icons/bs";
import styles from "./Share.module.css";
const Share = () => {
  return (
    <aside className={`sidebar-left`}>
      <button className={styles["share-button"]}>
        <BsThreeDots />
      </button>
    </aside>
  );
};

export default Share;
