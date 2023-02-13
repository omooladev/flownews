import styles from "./Email.module.css";
import EmailPrivacy from "./EmailPrivacy";
import { useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import EmailVerify from "../../UI/EmailVerification/VerifyEmail_CancelEmailRequest";

const Email = () => {
  const {
    userData: { emailIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section className={styles.email}>
      <h2>Email</h2>
      <hr />
      {(!emailIsVerified || emailRequestChange) && (
        <>
          <EmailVerify />
          <hr />
        </>
      )}
      <EmailPrivacy />
    </section>
  );
};

export default Email;
