import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../../store/App/app-context";
import { AuthContext } from "../../../store/Auth/auth-context";
import { BiX } from "react-icons/bi";
import PopUp from "../../../UI/PopUp";
import styles from "./Auth.module.css";
import { useTitle } from "../../../hooks/useTitle";
import Login from "./Login";
import BecomeContributor from "./BecomeContributor";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [passwordResetLinkSent, setPasswordResetLinkSent] = useState(false);
  const { lastLocation } = useContext(AppContext);
  const {
    isLoading,
    on_Login_BecomeContributor,
    authMessage,
    onChangeAuthMessage,
    onResetAuthMessage,
    isLoggedIn,
    onGetPasswordResetEmail,

    userData: { email, username },
  } = useContext(AuthContext);
  const history = useHistory();
  const location = history.location.pathname;
  const loginLocation = location.includes("/login");
  const becomeContributorLocation = location.includes("/become-contributor");
  const forgotPasswordLocation = location.includes("/forgot-password");
  useTitle(
    loginLocation
      ? "Login"
      : becomeContributorLocation
      ? "Become Contributor"
      : forgotPasswordLocation
      ? "Forgot Your Password"
      : ""
  );

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
      const email = emailRef.current.value || "";
      const emailLength = email.trim().length;
      const password = !forgotPasswordLocation && passwordRef.current.value;
      const passwordLength = !forgotPasswordLocation && password.trim().length;

      if (forgotPasswordLocation && emailLength === 0) {
        return onChangeAuthMessage({
          type: "error",
          message: "Please provide Email Address",
        });
      }
      if (emailLength === 0 || passwordLength === 0) {
        return onChangeAuthMessage({
          type: "error",
          message: "Please provide Email or Password",
        });
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
      if (forgotPasswordLocation) {
        const response = await onGetPasswordResetEmail(email, "sendPasswordResetLink");
        if (response === "password reset link sent") {
          setPasswordResetLinkSent(true);
        }
      }
    },
    [
      on_Login_BecomeContributor,
      loginLocation,
      becomeContributorLocation,
      forgotPasswordLocation,
      onChangeAuthMessage,
      onResetAuthMessage,
      onGetPasswordResetEmail,
    ]
  );

  const Nil = useCallback((event) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    onResetAuthMessage();
    try {
      if (isLoggedIn) {
        emailRef.current.value = email || "";
      }
      if (!isLoggedIn) {
        emailRef.current.value = "";
      }
      passwordRef.current.value = "";
    } catch (error) {}
  }, [location, onResetAuthMessage, email, isLoggedIn]);

  const loginHandler = useCallback((event) => {
    event.preventDefault();
    return onChangeAuthMessage({
      type: "error",
      message: "Password Length must be at least 8 characters",
    });
  }, []);
  return (
    <>
      {(!isLoggedIn || username) && (
        <PopUp
          onClick={isLoading ? Nil : closePopUpHandler}
          className={`auth_popup ${styles.auth}`}
        >
          <BiX
            className={`${styles.icon} ${styles.cancel}`}
            onClick={isLoading ? Nil : closePopUpHandler}
          />

          {loginLocation && (
            <Login
              isLoading={isLoading}
              loginHandler={loginHandler}
              viewPassword={viewPassword}
              toggleViewPasswordHandler={toggleViewPasswordHandler}
              authMessage={authMessage}
              onResetAuthMessage={onResetAuthMessage}
            />
          )}
          {becomeContributorLocation && (
            <BecomeContributor
              isLoading={isLoading}
              loginHandler={loginHandler}
              viewPassword={viewPassword}
              toggleViewPasswordHandler={toggleViewPasswordHandler}
              authMessage={authMessage}
              onResetAuthMessage={onResetAuthMessage}
            />
          )}
          {forgotPasswordLocation && (
            <ForgotPassword
              isLoading={isLoading}
              loginHandler={loginHandler}
              viewPassword={viewPassword}
              toggleViewPasswordHandler={toggleViewPasswordHandler}
              authMessage={authMessage}
              onResetAuthMessage={onResetAuthMessage}
              passwordResetLinkSent={passwordResetLinkSent}
              setPasswordResetLinkSent={setPasswordResetLinkSent}
            />
          )}
        </PopUp>
      )}
    </>
  );
};

export default Auth;
