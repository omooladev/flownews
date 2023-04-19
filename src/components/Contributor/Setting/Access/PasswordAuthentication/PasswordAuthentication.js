import { useCallback, useContext, useState, useRef} from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import EmailVerify from "../../UI/EmailVerification/SendVerificationEmail_CancelEmailChangeRequest";
import styles from "../../EditProfile/UI/UserForm/UserForm.module.css";
import styles2 from "./PasswordAuthentication.module.css";
import { useTitle } from "../../../../../hooks/useTitle";
import useNewLocation from "../../../../../hooks/useNewLocation";

const PasswordAuthentication = () => {
  useTitle("Account Security");
  const location = useLocation();
  useNewLocation(location.pathname);

  const {
    userData: { emailRequestChangeAddressIsVerified, emailRequestChange },
    onUpdate_ResetPassword,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const submitFormHandler = useCallback(
    async (event) => {
      event.preventDefault();

      const oldPassword = oldPasswordRef.current.value;
      const newPassword = newPasswordRef.current.value;
      const confirmNewPassword = confirmNewPasswordRef.current.value;
      const result = validatePassword(oldPassword, newPassword, confirmNewPassword);
      if (result) {
        return setMessage({ type: "error", text: result });
      }
      const passwordProperties = { oldPassword, newPassword, confirmNewPassword };
      setIsLoading(true);
      const response = await onUpdate_ResetPassword("update", passwordProperties);
      const error = response.error;
      const data = response.data;
      if (data) {
        if (data.message === "Password has been updated successfully") {
          setMessage({ type: "success", text: data.message });
        }
      }
      if (error) {
        setMessage({ type: "error", text: error });
      }
      setIsLoading(false);
    },
    [onUpdate_ResetPassword]
  );

  const validatePassword = (oldPassword, newPassword, confirmNewPassword) => {
    if (!oldPassword) {
      return "Please provide your old password";
    }
    if (!newPassword) {
      return "Please provide your new password";
    }
    if (!confirmNewPassword) {
      return "Please confirm your new password";
    }
    if (newPassword.trim().length < 8) {
      return "Password Length must be at least 8 characters";
    }
    if (newPassword.trim() !== confirmNewPassword.trim()) {
      return "Password does not match";
    }
  };

  const focusInputHandler = useCallback(() => {
    setMessage({ type: "", text: "" });
  }, []);
  return (
    <section className={styles2.password}>
      {(!emailRequestChangeAddressIsVerified || emailRequestChange) && <EmailVerify />}
      <h2>Change Password</h2>
      <hr />
      {message.type && <p className={`${message.type} ${styles2[message.type]}`}>{message.text}</p>}
      <form className={`${styles.form}`} onSubmit={submitFormHandler}>
        <div className={styles.form_controls}>
          <div className={styles.form_control}>
            <label>Old Password</label>
            <input type="password" ref={oldPasswordRef} onFocus={focusInputHandler} />
          </div>
          <div className={styles.form_control}>
            <label>New password</label>
            <input type="password" ref={newPasswordRef} onFocus={focusInputHandler} />
          </div>
          <div className={styles.form_control}>
            <label>Confirm new password</label>
            <input type="password" ref={confirmNewPasswordRef} onFocus={focusInputHandler} />
          </div>
          <p>Make sure it's at least 8 characters including a number and a lowercase letter.</p>
        </div>
        <div className={`${styles.form_actions} ${styles2.form_actions}`}>
          <button
            type="submit"
            className={styles.update_profile}
            disabled={isLoading ? true : false}
          >
            Update password
          </button>
          <p>
            <Link to="/forgot-password">Forgot my password?</Link>
          </p>
        </div>
      </form>
    </section>
  );
};
export default PasswordAuthentication;