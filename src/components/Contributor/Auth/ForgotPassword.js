import { Link } from "react-router-dom";
import { useRef, useEffect, useContext, useState } from "react";
import AuthLoader from "../../Loaders/AuthLoader";
import Reply from "./Reply";
import styles from "./Auth.module.css";
import { useTitle } from "../../../hooks/useTitle";
import { AuthContext } from "../../../store/Auth/auth-context";
import { useCallback } from "react";
const ForgotPassword = (props) => {
  useTitle("Forgot Your Password");
  const { authReply, onChangeAuthReply, onResetAuthReply, onValidateEmail } = props;
  const { history, onSendPasswordResetEmail } = useContext(AuthContext);
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
        onChangeAuthReply((prevMessage) => {
          return { ...prevMessage, type: "error", message: error };
        });
      }
      setIsLoading(false);
    },
    [onValidateEmail, onChangeAuthReply, onResetAuthReply, onSendPasswordResetEmail]
  );

  const returnToSignIn = useCallback(() => {
    setPasswordResetLinkSent(false);
    history.push("/login");
  }, [history]);
  useEffect(() => {
    onResetAuthReply();
  }, [onResetAuthReply]);

  return (
    <>
      <h1>Reset your Password</h1>
      <p className={styles.reset_password}>
        {!passwordResetLinkSent &&
          "Enter your user account's email address and we will send you a password reset link."}
      </p>
      <Reply isLoading={isLoading} authReply={authReply} onResetAuthReply={onResetAuthReply} />
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
              {isLoading ? <AuthLoader /> : "Send me password reset email"}
            </button>
          )}
          {passwordResetLinkSent && (
            <button type="button" onClick={returnToSignIn}>
              Return to sign in
            </button>
          )}
        </div>
      </form>

      <div className={styles.form_footer}>
        <p>Never mind?</p>
        <Link to="/login">Take me back to login</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
