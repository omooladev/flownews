import styles from "./Loader.module.css";
const Loader = (props) => {
  const source = props.source || "";
  return (
    <div className={`${styles.loader} ${styles[source]}`}>
      <div className={styles["spinner-3"]}></div>
    </div>
  );
};

export default Loader;
