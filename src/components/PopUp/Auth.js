import { useCallback, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AppContext } from "../../store/App/app-context";
import { AuthContext } from "../../store/Auth/auth-context";

import { BiX } from "react-icons/bi";
// import Card from "../../UI/Card";
import PopUp from "../../UI/PopUp";
import styles from "./Auth.module.css";

const Auth = () => {
  const { lastLocation } = useContext(AppContext);
  const { onLogin } = useContext(AuthContext);
  const history = useHistory();
  const location = history.location.pathname;
  const loginLocation = location.includes("/login");
  const becomeContributorLocation = location.includes("/become-contributor");
  const forgotPasswordLocation = location.includes("/forgot-password");

  const closePopUpHandler = useCallback((event) => {
    event.stopPropagation()
    return history.replace(lastLocation);
  }, [history, lastLocation]);

  const submitFormHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (loginLocation) onLogin();
    },
    [onLogin, loginLocation]
  );
  return (
    <PopUp onClick={closePopUpHandler} className={`auth_popup ${styles.login}`}>
      <BiX className={`${styles.icon} ${styles.cancel}`} onClick={closePopUpHandler} />
      {loginLocation && <h1>Log in to FlowNews</h1>}
      {becomeContributorLocation && <h1>Create a FlowNews account</h1>}
      {forgotPasswordLocation && (
        <>
          <h1>Reset your Password</h1>
          <p className={styles.reset_password}>
            To reset your password, enter the email address you use to sign in
          </p>
        </>
      )}
      {/* <Card className={styles.reply}>
        <p>Here is where the reply will appear</p>
        <BiX />
      </Card> */}
      <form className={styles.form} onSubmit={submitFormHandler}>
        <div className={styles.form_control}>
          <label>Email Address</label>
          <input type="email" />
        </div>
        {!forgotPasswordLocation && (
          <div className={styles.form_control}>
            <div className={styles.password_label}>
              <label>Password</label>
              {loginLocation && <NavLink to="/forgot-password">Forgot password?</NavLink>}
            </div>
            <input type="password" />
          </div>
        )}
        <div className={styles.form_actions}>
          <button type="submit">{`${
            loginLocation
              ? "Log in"
              : becomeContributorLocation
              ? "Sign up"
              : forgotPasswordLocation
              ? "Get reset link"
              : ""
          }`}</button>
        </div>
      </form>
      <div className={styles.form_footer}>
        {loginLocation && (
          <>
            <p>New to FlowNews?</p>
            <NavLink to="/become-contributor">Create an account</NavLink>
          </>
        )}
        {becomeContributorLocation && (
          <>
            <p>Already have an account?</p>
            <NavLink to="/login">Log in</NavLink>
          </>
        )}
        {forgotPasswordLocation && (
          <>
            <p>Never mind?</p>
            <NavLink to="/login">Take me back to login</NavLink>
          </>
        )}
      </div>
    </PopUp>
  );
};

export default Auth;
