import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Logo.module.css";
const Logo = (props) => {
  const history = useHistory();
  let className = props.className || "";
  const visitHomePage = useCallback(() => {
    history.push("/home");
  }, [history]);
  return (
    <div className={`${className} ${styles.logo}`} onClick={visitHomePage}>
      <h1 id={styles.FN_text}>FN</h1>
      <div>
        <h3 id={styles.flownews_text}>Flownews</h3>
        <hr></hr>
        <h3 id={styles.publication_text}>Publication</h3>
      </div>
    </div>
  );
};

export default React.memo(Logo);
