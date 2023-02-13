import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import EmailVerify from "../UI/EmailVerification/VerifyEmail_CancelEmailRequest";
import styles from "./Appearance.module.css";
const Appearance = () => {
  const {
    userData: { emailIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section className={styles.appearance}>
      <h2 className={styles.public_profile}>Public Profile</h2>
      <hr />
      {(!emailIsVerified || emailRequestChange) && (
        <>
          <EmailVerify />
          <hr />
        </>
      )}
    </section>
  );
};

export default Appearance;
