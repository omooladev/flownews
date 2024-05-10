//<---------- IMPORT MODULES ---------->
import { useCallback, useContext, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import EmailVerification from "../../UI/EmailVerification/EmailVerification";
import styles from "../../EditProfile/UI/UserForm/UserForm.module.css";
import styles2 from "./PasswordAuthentication.module.css";
import { useTitle } from "../../../../../hooks/useTitle";
import useNewLocation from "../../../../../hooks/useNewLocation";
import { configuration } from "../../../../../config";
import Error from "../../EditProfile/UI/UserForm/Error";

const PasswordAuthentication = () => {
  useTitle("Account Security");
  const location = useLocation();
  useNewLocation(location.pathname);

  const {
    contributorData: { emailRequestChangeAddressIsVerified, emailRequestChange },
    onUpdate_ResetPassword,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  let timeOutId = useRef();

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  const resetMessage = useCallback(() => {
    setMessage({ type: "", text: "" });
  }, []);
  const resetForm = useCallback(() => {
    oldPasswordRef.current.value = "";
    newPasswordRef.current.value = "";
    confirmNewPasswordRef.current.value = "";
  }, []);
  const submitFormHandler = useCallback(
    async (event) => {
      event.preventDefault();

      //----------> access the current value of the password
      const oldPassword = oldPasswordRef.current.value;
      const newPassword = newPasswordRef.current.value;
      const confirmNewPassword = confirmNewPasswordRef.current.value;

      const { hasError, message } = await validatePassword(oldPassword, newPassword, confirmNewPassword);
      if (hasError) {
        return setMessage({ type: "error", text: message });
      }
      const passwordProperties = { oldPassword, newPassword, confirmNewPassword };
      setIsLoading(true);
      const { error, data } = await onUpdate_ResetPassword("update", passwordProperties);

      if (data) {
        if (data.message === "Password has been updated successfully") {
          setMessage({ type: "success", text: data.message });
          timeOutId.current = setTimeout(() => {
            resetMessage();
            resetForm();
            clearTimeout(timeOutId.current);
          }, 1000);
        }
      }
      if (error) {
        setMessage({ type: "error", text: error });
      }
      setIsLoading(false);
    },
    [onUpdate_ResetPassword, resetMessage, resetForm]
  );

  const validatePassword = async (oldPassword, newPassword, confirmNewPassword) => {
    if (!oldPassword) {
      return { hasError: true, message: "Please provide your old password" };
    }
    if (!newPassword) {
      return { hasError: true, message: "Please provide your new password" };
    }
    if (!confirmNewPassword) {
      return { hasError: true, message: "Please confirm your new password" };
    }
    if (newPassword.trim().length < configuration.minLengthOfPassword) {
      return {
        hasError: true,
        message: `Password Length must be at least ${configuration.minLengthOfPassword} characters`,
      };
    }
    if (newPassword.trim() !== confirmNewPassword.trim()) {
      return { hasError: true, message: "Password does not match" };
    }
    return { hasError: false, message: null };
  };

  return (
    <section className={styles2.password}>
      {(!emailRequestChangeAddressIsVerified || emailRequestChange) && <EmailVerification />}
      <h2>Change Password</h2>
      <hr />
      {message.type === "success" && <p className={styles2.success}>{message.text}</p>}
      {message.type === "error" && <Error error={[message.text]} location="password-authentication" />}
      <form className={`${styles.form}`} onSubmit={submitFormHandler}>
        <div className={`${styles.form_controls} ${styles2.form_controls}`}>
          <div className={styles.form_control}>
            <label>Old password</label>
            <input type="password" ref={oldPasswordRef} onFocus={resetMessage} />
          </div>
          <div className={styles.form_control}>
            <label>New password</label>
            <input type="password" ref={newPasswordRef} onFocus={resetMessage} />
          </div>
          <div className={styles.form_control}>
            <label>Confirm new password</label>
            <input type="password" ref={confirmNewPasswordRef} onFocus={resetMessage} />
          </div>
          <p
            className={styles2.text}
          >{`Make sure it's at least ${configuration.minLengthOfPassword} characters including a number and a lowercase letter.`}</p>
        </div>
        <div className={`${styles.form_actions} ${styles2.form_actions}`}>
          <button type="submit" className={styles.update_profile} disabled={isLoading ? true : false}>
            {isLoading ? "Updating..." : "Update password"}
          </button>
          <p className={styles2.text}>
            <Link to="/forgot-password">Forgot my password?</Link>
          </p>
        </div>
      </form>
    </section>
  );
};
export default PasswordAuthentication;
