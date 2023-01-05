import { useCallback, useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { AppContext } from "../../store/App/app-context";
import BecomeAContributor from "../PopUp/BecomeAContributor";
import Login from "../PopUp/Login";
import styles from "./Account.module.css";
const Account = (props) => {
  const [openAccount, setOpenAccount] = useState(false);
  const { popUp, onPopUp } = useContext(AppContext);
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
  const toggleAccountContainer = useCallback((event) => {
    setOpenAccount((prevState) => {
      return !prevState;
    });
  }, []);

  return (
    <div className={`${className} ${styles.account_subscribe} ${openAccount ? styles.active : ""}`}>
      <div className={styles.my_account} onClick={toggleAccountContainer}>
        <div onMouseEnter={showOpenAccountContainer}>
          <FaRegUser className={styles.icon} />
          <span>my account</span>
        </div>
        <div className={styles["my_account_container"]} onMouseLeave={hideOpenAccountContainer}>
          <span>Get into your account</span>
          <hr />
          <div className={styles["my_account_container_button"]}>
            <button
              className={styles.login}
              onClick={() => onPopUp({ state: true, type: "login", from: "account" })}
            >
              Login
            </button>
            <button
              className={styles.contributor}
              onClick={() => onPopUp({ state: true, type: "contributor", from: "account" })}
            >
              Become a contributor
            </button>
          </div>
        </div>
      </div>
      <button type="button" className={styles.subscribe}>
        subscribe
      </button>

      {popUp.from === "account" && (
        <>
          {popUp.state && popUp.type === "login" && <Login />}
          {popUp.state && popUp.type === "contributor" && <BecomeAContributor />}
        </>
      )}
    </div>
  );
};
export default Account;
