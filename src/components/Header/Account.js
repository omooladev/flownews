import { useCallback, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import styles from "./Account.module.css";
const Account = (props) => {
  const [openAccount, setOpenAccount] = useState(false);
  let className = props.className || "";

  const showOpenAccountContainer = useCallback(() => {
    setOpenAccount((prevState) => {
      return true;
    });
  }, []);
  const hideOpenAccountContainer = useCallback(() => {
    setOpenAccount((prevState) => {
      return false;
    });
  }, []);

  return (
    <div className={`${className} ${styles.account_subscribe} ${openAccount ? styles.active : ""}`}>
      <div className={styles.my_account}>
        <div onMouseOver={showOpenAccountContainer}>
          <FaRegUser className={styles.icon} />
          <span>my account</span>
        </div>

        <div
          className={styles["my_account_container"]}
          onMouseOut={hideOpenAccountContainer}
          onMouseOver={showOpenAccountContainer}
        >
          <span>Get into your account</span>
          <hr />
          <div className={styles["my_account_container_button"]}>
            <button className={styles.login}>Login</button>
            <button className={styles.contributor}>Become a contributor</button>
          </div>
        </div>
      </div>

      <button type="button" className={styles.subscribe}>
        subscribe
      </button>
    </div>
  );
};
export default Account;
