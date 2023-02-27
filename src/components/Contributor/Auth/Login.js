import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import AuthLoader from "../../Loaders/AuthLoader";
import styles from "./Auth.module.css";
import Reply from "./Reply";
import { useTitle } from "../../../hooks/useTitle";
const Login = (props) => {
  useTitle("Login");
  const {
    isLoading,
    viewPassword,
    toggleViewPasswordHandler,
    authReply,
    onResetAuthReply,
    onValidateEmail,
    onValidatePassword,
  } = props;
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      //? validations
      const emailIsValid = onValidateEmail({ validationType: "check_full", email });
      if (!emailIsValid) {
        return;
      }
      const passwordIsValid = onValidatePassword({ validationType: "check_length", password });
      if (!passwordIsValid) {
        return;
      }
      onResetAuthReply();
    },
    [onValidateEmail, onValidatePassword]
  );

  useEffect(() => {
    onResetAuthReply();
  }, [onResetAuthReply]);

  return (
    <>
      <h1>Log in to FlowNews</h1>
      <Reply isLoading={isLoading} authReply={authReply} onResetAuthReply={onResetAuthReply} />
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
