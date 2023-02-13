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
      {(!emailIsVerified || emailRequestChange) && <EmailVerify />}
      <h2 className={styles.public_profile}>Theme preferences</h2>
      <hr />
      <p>
        Choose how Flownews looks to you. Select a single theme,the default value is the browser
        theme
      </p>
    </section>
  );
};

export default Appearance;
