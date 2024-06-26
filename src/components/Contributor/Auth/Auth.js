//<----------- IMPORT MODULES ---------->
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import { BiX } from "react-icons/bi";
import PopUp from "../../../UI/PopUp";
import Login from "./Login";
import BecomeContributor from "./BecomeContributor";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import styles from "./Auth.module.css";

const Auth = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [authReply, setAuthReply] = useState({ type: null, message: "" });
  const { history, lastLocation, cancelRequest,onMakeBodyFixed } = useContext(AuthContext);
  const location = history.location.pathname;
  const loginLocation = location.includes("/login");
  const becomeContributorLocation = location.includes("/become-contributor");
  const forgotPasswordLocation = location.includes("/forgot-password");
  const resetPasswordLocation = location.includes("/reset_password");

  //<---------- FUNCTIONS --------->
  const resetAuthReply = useCallback(() => {
    return setAuthReply((prevReply) => {
      return { ...prevReply, type: null, message: "" };
    });
  }, []);

  const changeAuthReply = useCallback((reply) => {
    return setAuthReply((prevReply) => {
      return { ...prevReply, ...reply };
    });
  }, []);

  const closePopUpHandler = useCallback(
    (event) => {
      event.stopPropagation();
      //----------> cancel the http request
      cancelRequest();
      history.replace(lastLocation);
      onMakeBodyFixed(false);
      if (authReply.type) {
        return resetAuthReply();
      }
    },
    [history, lastLocation, authReply, resetAuthReply, cancelRequest, onMakeBodyFixed]
  );

  const toggleViewPasswordHandler = useCallback(() => {
    setViewPassword((prevState) => !prevState);
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
          return {
            ...prevReply,
            type: "error",
            message: "Please provide your email address",
          };
        });
        return false;
      }
    }
    if (validationType === "check_@" || checkAllLogic) {
      if (!email.includes("@")) {
        setAuthReply((prevReply) => {
          return {
            ...prevReply,
            type: "error",
            message: "Email Address is invalid",
          };
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
          return {
            ...prevReply,
            type: "error",
            message: "Please provide your password",
          };
        });
        return false;
      }
      if (passwordLength < 8 && checkAllLogic) {
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
      <PopUp onClick={closePopUpHandler} className={`${styles.auth}`}>
        <div className={styles.mobile_cancel_icon}>
          <BiX className={`${styles.icon} ${styles.cancel}`} onClick={closePopUpHandler} />
        </div>

        {loginLocation && (
          <Login
            viewPassword={viewPassword}
            toggleViewPasswordHandler={toggleViewPasswordHandler}
            authReply={authReply}
            onChangeAuthReply={changeAuthReply}
            onResetAuthReply={resetAuthReply}
            onValidateEmail={validateEmailHandler}
            onValidatePassword={validatePasswordHandler}
          />
        )}
        {becomeContributorLocation && (
          <BecomeContributor
            viewPassword={viewPassword}
            toggleViewPasswordHandler={toggleViewPasswordHandler}
            authReply={authReply}
            onChangeAuthReply={changeAuthReply}
            onResetAuthReply={resetAuthReply}
            onValidateEmail={validateEmailHandler}
            onValidatePassword={validatePasswordHandler}
          />
        )}
        {forgotPasswordLocation && (
          <ForgotPassword
            authReply={authReply}
            onChangeAuthReply={changeAuthReply}
            onResetAuthReply={resetAuthReply}
            onValidateEmail={validateEmailHandler}
          />
        )}
        {resetPasswordLocation && (
          <ResetPassword
            viewPassword={viewPassword}
            toggleViewPasswordHandler={toggleViewPasswordHandler}
            authReply={authReply}
            onChangeAuthReply={changeAuthReply}
            onResetAuthReply={resetAuthReply}
            onValidateEmail={validateEmailHandler}
            onValidatePassword={validatePasswordHandler}
          />
        )}
      </PopUp>
    </>
  );
};

export default Auth;
