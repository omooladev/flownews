import { useCallback, useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import EmailVerify from "../../UI/EmailVerification/VerifyEmail_CancelEmailRequest";
import styles from "../../EditProfile/UI/UserForm/UserForm.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
const PasswordAuthentication = () => {
  const {
    userData: { emailIsVerified, emailRequestChange },
  } = useContext(AuthContext);

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const submitFormHandler = useCallback((event) => {
    event.preventDefault();
    // const oldPassword = oldPasswordRef.current.value;
    // const newPassword = newPasswordRef.current.value;
    // const confirmNewPassword = confirmNewPasswordRef.current.value;
  }, []);
  return (
    <section>
      {(!emailIsVerified || emailRequestChange) && <EmailVerify />}
      <h2>Change Password</h2>
      <hr />
      <form className={styles.form} onSubmit={submitFormHandler}>
        <div className={styles.form_controls}>
          <div className={styles.form_control}>
            <label>Old Password</label>
            <input type="password" required ref={oldPasswordRef} />
          </div>
          <div className={styles.form_control}>
            <label>New password</label>
            <input type="password" required minLength="8" maxLength="16" ref={newPasswordRef} />
          </div>
          <div className={styles.form_control}>
            <label>Confirm new password</label>
            <input
              type="password"
              required
              minLength="8"
              maxLength="16"
              ref={confirmNewPasswordRef}
            />
          </div>
          <p>Make sure it's at least 8 characters including a number and a lowercase letter.</p>
        </div>
        <div className={styles.form_actions}>
          <button
            type="submit"
            className={styles.update_profile}
            // disabled={isLoading ? true : false}
          >
            Update password
          </button>
          <p>
            <Link to="/password_reset">Forgot my password?</Link>
          </p>
        </div>
      </form>
    </section>
  );
};
export default PasswordAuthentication;
