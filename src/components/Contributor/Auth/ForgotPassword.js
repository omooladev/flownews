import { useRef, useEffect, useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle";
import { AuthContext } from "../../../store/Auth/auth-context";
import AuthLoader from "../../Loaders/AuthLoader";
import Reply from "./Reply";
import styles from "./Auth.module.css";

const ForgotPassword = (props) => {
  useTitle("Forgot Your Password");
  const { authReply, linkIsValid, onChangeAuthReply, onResetAuthReply, onValidateEmail } = props;
  const {
    history,
    onSendPasswordResetEmail,
    isLoggedIn,
    contributorData: { email },
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordResetLinkSent, setPasswordResetLinkSent] = useState(false);
  const emailRef = useRef();
  const sendPasswordResetLink = useCallback(
    async (event) => {
      event.preventDefault();
      onResetAuthReply();
      const email = emailRef.current.value;
      //? validations
      const emailIsValid = onValidateEmail({ validationType: "check_full", email });
      if (!emailIsValid) {
        emailRef.current.focus()
        return;
      }
      setIsLoading(true);
      const response = await onSendPasswordResetEmail(email, "sendPasswordResetLink");
      const error = response.error || "";
      const status = response.status || "";
      if (status === 200) {
        setPasswordResetLinkSent(true);
      }
      if (error) {
        onChangeAuthReply({ type: "error", message: error });
      }
      setIsLoading(false);
    },
    [onValidateEmail, onChangeAuthReply, onResetAuthReply, onSendPasswordResetEmail]
  );

  const returnToSignIn = useCallback(() => {
    setPasswordResetLinkSent(false);
    history.push("/login");
  }, [history]);

  const returnToSettingsPage = useCallback(() => {
    setPasswordResetLinkSent(false);
    history.push("/settings/security");
  }, [history]);
  useEffect(() => {
    if (linkIsValid !== false) {
      onResetAuthReply();
    }
  }, [linkIsValid, onResetAuthReply]);

  useEffect(() => {
    if (isLoggedIn && email) {
      emailRef.current.value = email;
    }
  }, [isLoggedIn, email]);

  return (
    <>
      <h1>Reset your Password</h1>
      {!passwordResetLinkSent && (
        <p className={styles.reset_password}>
          Enter your user account's email address and we will send you a password reset link.
        </p>
      )}
      {!isLoading && <Reply authReply={authReply} onResetAuthReply={onResetAuthReply} />}
      <form className={styles.form} onSubmit={sendPasswordResetLink}>
        {passwordResetLinkSent && (
          <p className={styles.reset_password}>
            Check your email for a link to reset your password. If it doesn't appear within a few
            minutes, check your spam folder
          </p>
        )}
        {!passwordResetLinkSent && (
          <div className={styles.form_control}>
            <label>Email Address</label>
            <input type="email" ref={emailRef} autoComplete="on" />
          </div>
        )}
        <div className={styles.form_actions}>
          {!passwordResetLinkSent && (
            <button type="submit" disabled={isLoading ? true : false}>
              {isLoading ? (
                <AuthLoader text="Sending Reset Link" />
              ) : (
                "Send me password reset email"
              )}
            </button>
          )}
          {passwordResetLinkSent && (
            <>
              {!isLoggedIn && (
                <button type="button" onClick={returnToSignIn}>
                  Return to sign in
                </button>
              )}
              {isLoggedIn && (
                <button type="button" onClick={returnToSettingsPage}>
                  Return to setting
                </button>
              )}
            </>
          )}
        </div>
        {!isLoggedIn && (
          <div className={styles.form_footer}>
            <p>Never mind!</p>
            <Link to={`${isLoading ? "#" : "/login"}`}>Take me back to login</Link>
          </div>
        )}
      </form>
    </>
  );
};

export default ForgotPassword;
