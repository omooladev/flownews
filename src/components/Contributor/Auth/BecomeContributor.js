import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef } from "react";
import AuthLoader from "../../Loaders/AuthLoader";
import styles from "./Auth.module.css";
import Reply from "./Reply";
const BecomeContributor = (props) => {
  const {
    isLoading,
    loginHandler,
    viewPassword,
    toggleViewPasswordHandler,
    authMessage,
    onResetAuthMessage,
  } = props;
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <>
      <h1>Create a FlowNews account</h1>
      <Reply
        isLoading={isLoading}
        authMessage={authMessage}
        onResetAuthMessage={onResetAuthMessage}
      />
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.form_control}>
          <label>Email Address</label>
          <input type="email" ref={emailRef} autoComplete="on" />
        </div>

        <div className={styles.form_control}>
          <div className={styles.password_label}>
            <label>Password</label>
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
            {isLoading ? <AuthLoader /> : "Sign up"}
          </button>
        </div>
      </form>
      <div className={styles.form_footer}>
        <p>Already have an account?</p>
        <Link to={`${isLoading ? "#" : "/login"}`}>Log in</Link>
      </div>
    </>
  );
};

export default BecomeContributor;
