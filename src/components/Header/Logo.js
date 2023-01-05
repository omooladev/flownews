import styles from "./Logo.module.css";
const Logo = (props) => {
  let className = props.className || "";
  return (
    <div className={`${className} ${styles.logo}`}>
      <h1 id={styles.FN_text}>FN</h1>
      <div>
        <h3 id={styles.flownews_text}>Flownews</h3>
        <hr></hr>
        <h3 id={styles.publication_text}>Publication</h3>
      </div>
    </div>
  );
};

export default Logo;
