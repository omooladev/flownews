import { useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import EmailVerify from "../../UI/EmailVerification/VerifyEmail_CancelEmailRequest";
import styles from "../../EditProfile/UI/UserForm/UserForm.module.css";
const PasswordAuthentication = () => {
  const {
    userData: { emailIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      {(!emailIsVerified || emailRequestChange) && <EmailVerify />}
      <h2>Change Password</h2>
      <hr />
      <form className={styles.form}>
        <div className={styles.form_controls}>
          <div className={styles.form_control}>
            <label>Old Password</label>
            <input type="password" />
          </div>
          <div className={styles.form_control}>
            <label>New password</label>
            <input type="password" />
          </div>
          <div className={styles.form_control}>
            <label>Confirm new password</label>
            <input type="password" />
          </div>
        </div>{" "}
        <div className={styles.form_actions}>
          <button
            type="submit"
            className={styles.update_profile}
            // disabled={isLoading ? true : false}
          >
            Update password
          </button>
        </div>
      </form>
    </section>
  );
};
export default PasswordAuthentication;
