import { FaRegUser } from "react-icons/fa";
import styles from "./Account.module.css";
const Account = (props) => {
  let className = props.className || "";
  return (
    <div className={`${className} ${styles.account_subscribe}`}>
      <div className={styles.my_account}>
        <FaRegUser className={styles.icon} />
        <span>my account</span>
      </div>
      <button type="button" className={styles.subscribe}>
        subscribe
      </button>
    </div>
  );
};
export default Account;
