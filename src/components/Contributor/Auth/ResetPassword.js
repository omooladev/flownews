import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import ForgotPassword from "./ForgotPassword";
import AuthLoader from "../../Loaders/AuthLoader";
import styles from "./Auth.module.css";
import Reply from "./Reply";
import { useTitle } from "../../../hooks/useTitle";
const ResetPassword = (props) => {
  useTitle("Reset Password");
  const { authReply, onChangeAuthReply, onResetAuthReply, onValidateEmail, onValidatePassword } =
    props;
  const { onVerifyPasswordResetLink, history } = useContext(AuthContext);
  const location = history.location;
  const [isLoading, setIsLoading] = useState(false);
  const [linkIsValid, setLinkIsValid] = useState(null);
  const [username, setUsername] = useState("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const verifyPasswordResetLink = useCallback(async () => {
    setIsLoading(true);
    const response = await onVerifyPasswordResetLink(location.pathname);
    const status = response.status || "";
    const data = response.data || "";
    const error = response.error || "";
    if (status === 200 && data) {
      setLinkIsValid(true);
      setUsername(data.username);
    }
    if (error) {
      setLinkIsValid(false);
      onChangeAuthReply({
        type: "error",
        message: error,
      });
    }
    setIsLoading(false);
  }, [location, onVerifyPasswordResetLink, onChangeAuthReply]);

  const changePasswordHandler = useCallback(
    async (event) => {
      event.preventDefault();
      onResetAuthReply();
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      //? validations
      const passwordIsValid = onValidatePassword({ validationType: "check_full", password });
      if (!passwordIsValid) {
        passwordRef.current.focus();
        return;
      }
      const confirmPasswordIsValid = onValidatePassword({
        validationType: "check_length",
        password: confirmPassword,
      });
      if (!confirmPasswordIsValid) {
        confirmPasswordRef.current.focus();
        return;
      }
      if (password !== confirmPassword) {
        confirmPasswordRef.current.focus();
        return onChangeAuthReply({ type: "error", message: "Password does not match" });
      }
    },
    [onResetAuthReply, onValidatePassword, onChangeAuthReply]
  );
  useEffect(() => {
    verifyPasswordResetLink();
  }, [verifyPasswordResetLink]);
  useEffect(() => {
    onResetAuthReply();
  }, [onResetAuthReply]);
  return (
    <>
      {isLoading && <h3>Checking Link....</h3>}
      {!isLoading && !linkIsValid && linkIsValid !== null && (
        <ForgotPassword
          linkIsValid={linkIsValid}
          authReply={authReply}
          onChangeAuthReply={onChangeAuthReply}
          onResetAuthReply={onResetAuthReply}
          onValidateEmail={onValidateEmail}
        />
      )}
      {!isLoading && linkIsValid && (
        <>
          <h1>Change password for</h1>
          <p className={styles.username}>{`@${username}`}</p>
          <Reply isLoading={isLoading} authReply={authReply} onResetAuthReply={onResetAuthReply} />
          <form className={styles.form} onSubmit={changePasswordHandler}>
            <div className={styles.form_control}>
              <div className={styles.password_label}>
                <label>Password</label>
              </div>
              <div className={styles.input_container}>
                <input type="password" ref={passwordRef} />
              </div>
            </div>
            <div className={styles.form_control}>
              <div className={styles.password_label}>
                <label>Confirm Password</label>
              </div>
              <div className={styles.input_container}>
                <input type="password" ref={confirmPasswordRef} />
              </div>
            </div>
            <div className={styles.form_actions}>
              <p>Make sure it is at least 8 characters including a number and a lowercase letter</p>
              <button type="submit" disabled={isLoading ? true : false}>
                {isLoading ? <AuthLoader /> : "Change password"}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ResetPassword;
