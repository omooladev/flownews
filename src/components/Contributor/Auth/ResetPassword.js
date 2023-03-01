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
  const { onResetPassword, onVerifyPasswordResetLink, history } = useContext(AuthContext);
  const location = history.location;
  const [isLoading, setIsLoading] = useState({ type: null });
  const [linkIsValid, setLinkIsValid] = useState(null);
  const [username, setUsername] = useState("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const verifyPasswordResetLink = useCallback(async () => {
    setIsLoading((prevValue) => {
      return { ...prevValue, type: "link" };
    });
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
    setIsLoading((prevValue) => {
      return { ...prevValue, type: null };
    });
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
      setIsLoading((prevValue) => {
        return { ...prevValue, type: true };
      });
      const response = await onResetPassword(username, { password, confirmPassword });
      const status = response.status || "";
      const data = response.data || "";
      const error = response.error || "";
      if (status === 200 && data) {
      }
      if (error) {
        onChangeAuthReply({
          type: "error",
          message: error,
        });
      }
      setIsLoading((prevValue) => {
        return { ...prevValue, type: false };
      });
    },
    [username, onResetPassword, onResetAuthReply, onValidatePassword, onChangeAuthReply]
  );
  useEffect(() => {
    verifyPasswordResetLink();
  }, [verifyPasswordResetLink]);
  useEffect(() => {
    onResetAuthReply();
  }, [onResetAuthReply]);
  return (
    <>
      {isLoading.type === "link" && <h3>Checking Link....</h3>}
      {isLoading.type !== "link" && !linkIsValid && linkIsValid !== null && (
        <ForgotPassword
          linkIsValid={linkIsValid}
          authReply={authReply}
          onChangeAuthReply={onChangeAuthReply}
          onResetAuthReply={onResetAuthReply}
          onValidateEmail={onValidateEmail}
        />
      )}
      {isLoading.type !== "link" && linkIsValid && (
        <>
          <h1>Change password for</h1>
          <p className={styles.username}>{`@${username}`}</p>
          {isLoading.type === false && (
            <Reply authReply={authReply} onResetAuthReply={onResetAuthReply} />
          )}
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
              <button type="submit" disabled={isLoading.type === true ? true : false}>
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
