//<--------- IMPORT MODULES --------->
import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import { useTitle } from "../../../hooks/useTitle";
import ForgotPassword from "./ForgotPassword";
import AuthLoader from "../../Loaders/AuthLoader";
import Reply from "./Reply";
import Login from "./Login";
import styles from "./Auth.module.css";


const ResetPassword = (props) => {
  useTitle("Reset Password");
  const {
    viewPassword,
    toggleViewPasswordHandler,
    authReply,
    onChangeAuthReply,
    onResetAuthReply,
    onValidateEmail,
    onValidatePassword,
  } = props;
  const { onUpdate_ResetPassword, onVerifyPasswordResetLink, history, isLoggedIn } = useContext(AuthContext);
  const location = history.location;
  const [isLoading, setIsLoading] = useState({ type: null });
  const [linkIsValid, setLinkIsValid] = useState(null);
  const [contributorData, setContributorData] = useState({ contributorUsername: "", contributorId: "" });
  const [passwordChanged, setPasswordChanged] = useState(false);
  //refs
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //<--------- Function for verifying password reset link
  const verifyPasswordResetLink = useCallback(async () => {
    //---------> set the loading type to link
    setIsLoading((prevValue) => {
      return { ...prevValue, type: "link" };
    });
    const { status, data, error } = await onVerifyPasswordResetLink(location.pathname);

    if (status === 200 && data) {
      setLinkIsValid(true);
      setContributorData({ contributorUsername: data.username, contributorId: data._id });
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
      //--------> reset the auth reply
      onResetAuthReply();
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      //<---------- Validations starts here --------->
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
      //<---------- Validations ends here --------->
      setIsLoading((prevValue) => {
        return { ...prevValue, type: true };
      });

      const { status, error } = await onUpdate_ResetPassword(
        "reset_password",
        contributorData.contributorId,
        {
          password,
          confirmPassword,
        }
      );
      if (status === 200) {
        setPasswordChanged(true);
        onChangeAuthReply({ type: "success", message: "New password set successfully" });
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
    [contributorData, onUpdate_ResetPassword, onResetAuthReply, onValidatePassword, onChangeAuthReply]
  );
  const returnToSettingsPage = useCallback(() => {
    history.push("/settings/security");
  }, [history]);

  useEffect(() => {
    //----------> verify the password reset link
    verifyPasswordResetLink();
  }, [verifyPasswordResetLink]);
  useEffect(() => {
    onResetAuthReply();
  }, [onResetAuthReply]);
  return (
    <>
      {/* If the loading type is link */}
      {isLoading.type === "link" && <AuthLoader text="Checking Link" className={styles.checking_link} />}
      {!isLoggedIn && isLoading.type !== "link" && passwordChanged && (
        <Login
          passwordChanged={passwordChanged}
          viewPassword={viewPassword}
          toggleViewPasswordHandler={toggleViewPasswordHandler}
          authReply={authReply}
          onChangeAuthReply={onChangeAuthReply}
          onResetAuthReply={onResetAuthReply}
          onValidateEmail={onValidateEmail}
          onValidatePassword={onValidatePassword}
        />
      )}
      {isLoggedIn && passwordChanged && (
        <>
          <h3>{authReply.message}</h3>
          <button type="button" onClick={returnToSettingsPage} className={styles.return_to_setting}>
            Return to setting
          </button>
        </>
      )}
      {/* if password has not been changed  */}
      {!passwordChanged && (
        <>
          {/* if we stopped loading and the link is not valid */}
          {isLoading.type !== "link" && !linkIsValid && linkIsValid !== null && (
            <ForgotPassword
              linkIsValid={linkIsValid}
              authReply={authReply}
              onChangeAuthReply={onChangeAuthReply}
              onResetAuthReply={onResetAuthReply}
              onValidateEmail={onValidateEmail}
            />
          )}
          {/* if we stopped loading and the link is valid */}
          {isLoading.type !== "link" && linkIsValid && (
            <>
              <h1>Change password for</h1>
              <p className={styles.username}>{`@${contributorData.contributorUsername}`}</p>
              <Reply authReply={authReply} onResetAuthReply={onResetAuthReply} />
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
                    {isLoading.type === true ? <AuthLoader /> : "Change password"}
                  </button>
                </div>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ResetPassword;
