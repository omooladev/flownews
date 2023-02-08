import styles from "./Email.module.css";
import EmailPrivacy from "./EmailPrivacy";
import EmailRequestChangeCancel from "./EmailRequestChangeCancel";
import { useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";

const Email = () => {
  const {userData:{emailIsVerified,emailRequestChange}}=useContext(AuthContext)
  return (
    <section className={styles.email}>
      <h2>Email</h2>
      <hr />
      {(!emailIsVerified || emailRequestChange) && <EmailRequestChangeCancel />}

      <EmailPrivacy />
    </section>
  );
};

export default Email;
