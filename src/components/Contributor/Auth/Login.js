import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTitle } from "../../../hooks/useTitle";
import { AuthContext } from "../../../store/Auth/auth-context";
import AuthLoader from "../../Loaders/AuthLoader";
import Reply from "./Reply";
import styles from "./Auth.module.css";
const Login = (props) => {
  useTitle("Login");
  const {
    passwordChanged,
    viewPassword,
    toggleViewPasswordHandler,
    authReply,
    onChangeAuthReply,
    onResetAuthReply,
    onValidateEmail,
    onValidatePassword,
  } = props;
  const { changeAppMode, onLoginOrBecomeContributor, history, onSaveContributorData } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  //* refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginHandler = useCallback(
    async (event) => {
      event.preventDefault();
      //*reset reply
      onResetAuthReply();
      //*get input values
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      //* validations
      const emailIsValid = onValidateEmail({ validationType: "check_full", email });
      if (!emailIsValid) {
        emailRef.current.focus();
        return;
      }
      const passwordIsValid = onValidatePassword({ validationType: "check_length", password });
      if (!passwordIsValid) {
        passwordRef.current.focus();
        return;
      }

      setIsLoading(true);
      const response = await onLoginOrBecomeContributor({
        location: "login",
        contributorAuthData: { email, password },
      });
      const data = response.data || "";
      const error = response.error || "";
      console.log(data);
      if (data) {
        onSaveContributorData(data);
        changeAppMode({
          username: data.username,
          token: data.token,
          isLoggedIn: true,
          tokenExpirationTime: data.tokenExpirationTime,
        });
        history.replace("/home");
      }
      if (error) {
        onChangeAuthReply({ type: "error", message: error });
      }
      setIsLoading(false);
    },
    [
      history,
      changeAppMode,
      onValidateEmail,
      onValidatePassword,
      onChangeAuthReply,
      onResetAuthReply,
      onSaveContributorData,
      onLoginOrBecomeContributor,
    ]
  );

  useEffect(() => {
    if (!passwordChanged) onResetAuthReply();
  }, [passwordChanged, onResetAuthReply]);

  return (
    <>
      <h1>Log in to FlowNews</h1>
      {!isLoading && <Reply authReply={authReply} onResetAuthReply={onResetAuthReply} />}
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.form_control}>
          <label>Email Address</label>
          <input type="email" ref={emailRef} autoComplete="on" />
        </div>
        <div className={styles.form_control}>
          <div className={styles.password_label}>
            <label>Password</label>
            <Link to={`${isLoading ? "#" : "/forgot-password"}`}>Forgot password?</Link>
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
        <div className={styles.form_actions}>
          <button type="submit" disabled={isLoading ? true : false}>
            {isLoading ? <AuthLoader /> : "Log in"}
          </button>
        </div>
      </form>
      <div className={styles.form_footer}>
        <p>New to FlowNews?</p>
        <Link to={`${isLoading ? "#" : "/become-contributor"}`}>Create an account</Link>
      </div>
    </>
  );
};

export default Login;
