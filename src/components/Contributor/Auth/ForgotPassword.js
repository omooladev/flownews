import { Link, useHistory } from "react-router-dom";
import { useRef } from "react";
import AuthLoader from "../../Loaders/AuthLoader";
import Reply from "./Reply";
import styles from "./Auth.module.css";
const ForgotPassword = (props) => {
  const history = useHistory();
  const {
    isLoading,
    loginHandler,
    authMessage,
    onResetAuthMessage,
    passwordResetLinkSent,
    setPasswordResetLinkSent,
  } = props;
  const emailRef = useRef();
  return (
    <>
      <h1>Reset your Password</h1>
      <p className={styles.reset_password}>
        {!passwordResetLinkSent &&
          "Enter your user account's email address and we will send you a password reset link."}
      </p>
      <Reply
        isLoading={isLoading}
        authMessage={authMessage}
        onResetAuthMessage={onResetAuthMessage}
      />
      <form className={styles.form} onSubmit={loginHandler}>
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
            <button
              type="button"
              onClick={() => {
                setPasswordResetLinkSent(false);
                history.push("/login");
              }}
            >
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
