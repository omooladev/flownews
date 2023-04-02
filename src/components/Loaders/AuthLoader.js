import styles from "./AuthLoader.module.css";
const AuthLoader = (props) => {
  const text = props.text || "Loading";

  return <div className={styles["classic-5"]}>{text}</div>;
};

export default AuthLoader;
