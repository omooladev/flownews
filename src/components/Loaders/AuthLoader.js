import styles from "./AuthLoader.module.css";
const AuthLoader = (props) => {
  const text = props.text || "Loading";
  const className = props.className || "";

  return <div className={`${styles["classic-5"]} ${className}`}>{text}</div>;
};

export default AuthLoader;
