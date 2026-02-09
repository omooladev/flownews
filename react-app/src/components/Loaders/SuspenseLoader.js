import styles from "./SuspenseLoader.module.css";
const SuspenseLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles["spinner-3"]}></div>
    </div>
  );
};

export default SuspenseLoader;
