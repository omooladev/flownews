import { useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import styles from "./Email.module.css";
import EmailRequestChangeCancel from "./EmailRequestChangeCancel";

const Email = () => {
  const {
    userData: { emailRequestChange, emailRequestChangeAddress, emailIsVerified },
  } = useContext(AuthContext);
  return (
    <section className={styles.email}>
      <h2>Email</h2>
      <hr />
      <EmailRequestChangeCancel
        emailRequestChange={emailRequestChange}
        emailRequestChangeAddress={emailRequestChangeAddress}
        emailIsVerified={emailIsVerified}
      />
      {(!emailIsVerified || emailRequestChange) && <hr />}
    </section>
  );
};

export default Email;
