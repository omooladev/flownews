import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { AppContext } from "../../store/App/app-context";
import { AuthContext } from "../../store/Auth/auth-context";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import Card from "../../UI/Card";
import PopUp from "../../UI/PopUp";
import styles from "./Auth.module.css";
import AuthLoader from "../Loaders/AuthLoader";

const Auth = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const { lastLocation } = useContext(AppContext);
  const {
    isLoading,
    on_Login_BecomeContributor,
    authMessage,
    onChangeAuthMessage,
    onResetAuthMessage,
    isLoggedIn,
  } = useContext(AuthContext);
  const history = useHistory();
  const location = history.location.pathname;
  const loginLocation = location.includes("/login");
  const becomeContributorLocation = location.includes("/become-contributor");
  const forgotPasswordLocation = location.includes("/forgot-password");

  const emailRef = useRef();
  const passwordRef = useRef();

  const closePopUpHandler = useCallback(
    (event) => {
      event.stopPropagation();
      history.replace(lastLocation);
      if (authMessage.type) {
        return onResetAuthMessage();
      }
    },
    [history, lastLocation, authMessage, onResetAuthMessage]
  );

  const toggleViewPasswordHandler = useCallback(() => {
    setViewPassword((prevState) => !prevState);
  }, []);

  const submitFormHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const email = emailRef.current.value;
      const emailLength = email.trim().length;
      const password = passwordRef.current.value;
      const passwordLength = password.trim().length;

      if (emailLength === 0 || passwordLength === 0) {
        return onChangeAuthMessage({ type: "error", message: "Please provide Email or Password" });
      }
      if (!email.includes("@")) {
        return onChangeAuthMessage({ type: "error", message: "Email Address is Invalid" });
      }
      if (becomeContributorLocation && passwordLength < 8) {
        return onChangeAuthMessage({
          type: "error",
          message: "Password Length must be at least 8 characters",
        });
      }
      onResetAuthMessage();
      if (loginLocation || becomeContributorLocation) {
        const authLocation = loginLocation ? "login" : "become-contributor";
        on_Login_BecomeContributor(authLocation, { email, password });
      }
    },
    [
      on_Login_BecomeContributor,
      loginLocation,
      becomeContributorLocation,
      onChangeAuthMessage,
      onResetAuthMessage,
    ]
  );

  const Nil = useCallback((event) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    onResetAuthMessage();
    try {
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {}
  }, [location, onResetAuthMessage]);
  return (
    <PopUp onClick={isLoading ? Nil : closePopUpHandler} className={`auth_popup ${styles.login}`}>
      <BiX
        className={`${styles.icon} ${styles.cancel}`}
        onClick={isLoading ? Nil : closePopUpHandler}
      />
      {loginLocation && <h1>Log in to FlowNews</h1>}
      {becomeContributorLocation && <h1>Create a FlowNews account</h1>}
      {forgotPasswordLocation && (
        <>
          <h1>Reset your Password</h1>
          <p className={styles.reset_password}>
            Enter your user account's email address and we will send you a password reset link.
          </p>
        </>
      )}
      {!isLoading && authMessage && authMessage.type && (
        <Card
          className={`${styles.reply} ${
            authMessage.type === "success" ? styles["success"] : styles["error"]
          }`}
        >
          <p>{authMessage.message}</p>
          <BiX className={styles.cancel_icon} onClick={onResetAuthMessage} />
        </Card>
      )}
      <form className={styles.form} onSubmit={submitFormHandler}>
        <div className={styles.form_control}>
          <label>Email Address</label>
          <input type="email" ref={emailRef} autoComplete="on" />
        </div>
        {!forgotPasswordLocation && (
          <div className={styles.form_control}>
            <div className={styles.password_label}>
              <label>Password</label>
              {loginLocation && (
                <Link to={`${isLoading ? "#" : "/forgot-password"}`}>Forgot password?</Link>
              )}
            </div>
            <div className={styles.input_container}>
              <input type={viewPassword ? "text" : "password"} ref={passwordRef} />
              {!viewPassword && (
                <FaEyeSlash className={styles.password_icon} onClick={toggleViewPasswordHandler} />
              )}
              {viewPassword && (
                <FaEye className={styles.password_icon} onClick={toggleViewPasswordHandler} />
              )}
            </div>
          </div>
        )}
        <div className={styles.form_actions}>
          <button type="submit" disabled={isLoading ? true : false}>
            {isLoading ? (
              <AuthLoader />
            ) : (
              `${
                loginLocation
                  ? "Log in"
                  : becomeContributorLocation
                  ? "Sign up"
                  : forgotPasswordLocation
                  ? "Send me password reset email"
                  : ""
              }`
            )}
          </button>
        </div>
      </form>
      {!isLoggedIn && (
        <div className={styles.form_footer}>
          {loginLocation && (
            <>
              <p>New to FlowNews?</p>
              <Link to={`${isLoading ? "#" : "/become-contributor"}`}>Create an account</Link>
            </>
          )}
          {becomeContributorLocation && (
            <>
              <p>Already have an account?</p>
              <Link to="/login">Log in</Link>
            </>
          )}
          {forgotPasswordLocation && (
            <>
              <p>Never mind?</p>
              <Link to="/login">Take me back to login</Link>
            </>
          )}
        </div>
      )}
    </PopUp>
  );
};

export default Auth;
