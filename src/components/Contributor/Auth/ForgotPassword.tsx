//<---------- IMPORT MODULES ---------->
import { useRef, useEffect, useContext, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import { AuthContext } from '../../../store/Auth/auth-context';
import AuthLoader from '../../Loaders/AuthLoader';
import Reply from './Reply';
import styles from './Auth.module.css';

const ForgotPassword = (props) => {
  console.log('forgot password');
  useTitle('Forgot Your Password');
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

  //<---------- Function for sending the password reset link
  const sendPasswordResetLink = useCallback(
    async (event) => {
      event.preventDefault();
      //----------> reset the reply
      onResetAuthReply();
      //----------> get the value of the email
      const email = emailRef.current.value;
      //----------> validate email address
      const emailIsValid = onValidateEmail({ validationType: 'check_full', email });
      if (!emailIsValid) {
        emailRef.current.focus();
        return;
      }
      setIsLoading(true);
      const { error, status } = await onSendPasswordResetEmail(email, 'sendPasswordResetLink');

      if (status === 200) {
        setPasswordResetLinkSent(true);
      }
      if (error) {
        onChangeAuthReply({ type: 'error', message: error });
      }
      setIsLoading(false);
    },
    [onValidateEmail, onChangeAuthReply, onResetAuthReply, onSendPasswordResetEmail],
  );

  const returnToSignIn = useCallback(() => {
    setPasswordResetLinkSent(false);
    history.push('/login');
  }, [history]);

  const returnToSettingsPage = useCallback(() => {
    setPasswordResetLinkSent(false);
    history.push('/settings/security');
  }, [history]);
  useEffect(() => {
    if (linkIsValid !== false) {
      onResetAuthReply();
    }
  }, [linkIsValid, onResetAuthReply]);

  useEffect(() => {
    //if the contributor is logged in and the email exist, we display it in the email input
    if (isLoggedIn && email) {
      emailRef.current.value = email;
    }
  }, [isLoggedIn, email]);

  return (
    <>
      <h1>Reset your Password</h1>
      {/* If password reset link is not sent */}
      {!passwordResetLinkSent && <p className={styles.reset_password}>Enter your user account's email address and we will send you a password reset link.</p>}
      {/* The reply only displays if there is no loading event i.e if loading is false */}
      {!isLoading && <Reply authReply={authReply} onResetAuthReply={onResetAuthReply} />}
      <form className={styles.form} onSubmit={sendPasswordResetLink}>
        {/* If password reset link is sent, display a message */}
        {passwordResetLinkSent && <p className={styles.reset_password}>Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder</p>}
        {/* If password reset link is not sent, display the form control */}
        {!passwordResetLinkSent && (
          <div className={styles.form_control}>
            <label>Email Address</label>
            <input type="email" ref={emailRef} autoComplete="on" />
          </div>
        )}
        <div className={styles.form_actions}>
          {/* If password reset link is not sent, display button for sending the reset mail */}
          {!passwordResetLinkSent && (
            <button type="submit" disabled={isLoading ? true : false}>
              {isLoading ? <AuthLoader text="Sending Reset Link" /> : 'Send me password reset email'}
            </button>
          )}
          {/* If password reset link is sent, display button to return to sign in if contributor is not login or return to setting if he is logged in */}
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
        {/* If we are not logged in , we add a a link to taking contributor back to the login  */}
        {!isLoggedIn && !passwordResetLinkSent && (
          <div className={styles.form_footer}>
            <p>Never mind!</p>
            <Link to={`${isLoading ? '#' : '/login'}`}>Take me back to login</Link>
          </div>
        )}
      </form>
    </>
  );
};

export default ForgotPassword;
