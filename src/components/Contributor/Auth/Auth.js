import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../store/App/app-context";
import { AuthContext } from "../../../store/Auth/auth-context";
import { BiX } from "react-icons/bi";
import PopUp from "../../../UI/PopUp";
import styles from "./Auth.module.css";
import Login from "./Login";
import BecomeContributor from "./BecomeContributor";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [passwordResetLinkSent, setPasswordResetLinkSent] = useState(false);
  const { lastLocation } = useContext(AppContext);
  const [authReply, setAuthReply] = useState({ type: null, message: "" });
  const {
    isLoading,
    on_Login_BecomeContributor,

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
  const resetAuthReply = useCallback(() => {
    setAuthReply((prevReply) => {
      return { ...prevReply, type: null, message: "" };
    });
  }, []);

  const closePopUpHandler = useCallback(
    (event) => {
      event.stopPropagation();
      history.replace(lastLocation);
      if (authReply.type) {
        return resetAuthReply();
      }
    },
    [history, lastLocation, authReply, resetAuthReply]
  );

  const toggleViewPasswordHandler = useCallback(() => {
    setViewPassword((prevState) => !prevState);
  }, []);

  // const submitFormHandler = useCallback(
  //   async (event) => {
  //     event.preventDefault();
  //     const email = emailRef.current.value || "";
  //     const emailLength = email.trim().length;
  //     const password = !forgotPasswordLocation && passwordRef.current.value;
  //     const passwordLength = !forgotPasswordLocation && password.trim().length;

  //     if (forgotPasswordLocation && emailLength === 0) {
  //       return onChangeAuthMessage({
  //         type: "error",
  //         message: "Please provide Email Address",
  //       });
  //     }
  //     if (emailLength === 0 || passwordLength === 0) {
  //       return onChangeAuthMessage({
  //         type: "error",
  //         message: "Please provide Email or Password",
  //       });
  //     }
  //     if (!email.includes("@")) {
  //       return onChangeAuthMessage({ type: "error", message: "Email Address is Invalid" });
  //     }
  //     if (becomeContributorLocation && passwordLength < 8) {
  //       return onChangeAuthMessage({
  //         type: "error",
  //         message: "Password Length must be at least 8 characters",
  //       });
  //     }
  //     onResetAuthMessage();
  //     if (loginLocation || becomeContributorLocation) {
  //       const authLocation = loginLocation ? "login" : "become-contributor";
  //       on_Login_BecomeContributor(authLocation, { email, password });
  //     }
  //     if (forgotPasswordLocation) {
  //       const response = await onGetPasswordResetEmail(email, "sendPasswordResetLink");
  //       if (response === "password reset link sent") {
  //         setPasswordResetLinkSent(true);
  //       }
  //     }
  //   },
  //   [
  //     on_Login_BecomeContributor,
  //     loginLocation,
  //     becomeContributorLocation,
  //     forgotPasswordLocation,
  //     onChangeAuthMessage,
  //     onResetAuthMessage,
  //     onGetPasswordResetEmail,
  //   ]
  // );

  const Nil = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const validateEmailHandler = useCallback(({ validationType, email }) => {
    let checkAllLogic;
    if (validationType === "check_full") {
      checkAllLogic = true;
    }
    if (validationType === "check_length" || checkAllLogic) {
      const emailLength = email.trim().length;
      if (emailLength === 0) {
        setAuthReply((prevReply) => {
          return { ...prevReply, type: "error", message: "Please provide your email address" };
        });
        return false;
      }
    }
    if (validationType === "check_@" || checkAllLogic) {
      if (!email.includes("@")) {
        setAuthReply((prevReply) => {
          return { ...prevReply, type: "error", message: "Email Address is invalid" };
        });
        return false;
      }
    }
    return true;
  }, []);
  const validatePasswordHandler = useCallback(({ validationType, password }) => {
    let checkAllLogic;
    if (validationType === "check_full") {
      checkAllLogic = true;
    }
    if (validationType === "check_length" || checkAllLogic) {
      const passwordLength = password.trim().length;
      if (passwordLength === 0) {
        setAuthReply((prevReply) => {
          return { ...prevReply, type: "error", message: "Please provide your password" };
        });
        return false;
      }
      if (passwordLength < 8) {
        setAuthReply((prevReply) => {
          return {
            ...prevReply,
            type: "error",
            message: "Password Length must be at least 8 characters",
          };
        });
        return false;
      }
    }
    return true;
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
              viewPassword={viewPassword}
              toggleViewPasswordHandler={toggleViewPasswordHandler}
              authReply={authReply}
              onResetAuthReply={resetAuthReply}
              onValidateEmail={validateEmailHandler}
              onValidatePassword={validatePasswordHandler}
            />
          )}
          {becomeContributorLocation && (
            <BecomeContributor
              isLoading={isLoading}
              viewPassword={viewPassword}
              toggleViewPasswordHandler={toggleViewPasswordHandler}
              authReply={authReply}
              onResetAuthReply={resetAuthReply}
            />
          )}
          {forgotPasswordLocation && (
            <ForgotPassword
              isLoading={isLoading}
              viewPassword={viewPassword}
              toggleViewPasswordHandler={toggleViewPasswordHandler}
              authReply={authReply}
              onResetAuthReply={resetAuthReply}
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
