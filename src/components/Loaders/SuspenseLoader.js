import styles from "./SuspenseLoader.module.css";
const SuspenseLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles["spinner-4"]}></div>
    </div>
  );
};

export default SuspenseLoader;
