import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthLoader from "../../Loaders/AuthLoader";
import styles from "./Auth.module.css";
import Reply from "./Reply";
import { useTitle } from "../../../hooks/useTitle";
import { AuthContext } from "../../../store/Auth/auth-context";
const BecomeContributor = (props) => {
  useTitle("Become Contributor");
  const {
    viewPassword,
    toggleViewPasswordHandler,
    authReply,
    onChangeAuthReply,
    onResetAuthReply,
    onValidateEmail,
    onValidatePassword,
  } = props;
  const { onLoginOrBecomeContributor, history } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const becomeContributorHandler = useCallback(
    async (event) => {
      event.preventDefault();
      onResetAuthReply();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const emailIsValid = onValidateEmail({ validationType: "check_full", email });
      if (!emailIsValid) {
        emailRef.current.focus();
        return;
      }
      const passwordIsValid = onValidatePassword({ validationType: "check_full", password });
      if (!passwordIsValid) {
        passwordRef.current.focus();
        return;
      }
      setIsLoading(true);
      const response = await onLoginOrBecomeContributor({
        location: "become-contributor",
        contributorAuthData: { email, password },
      });
      const data = response.data || "";
      const error = response.error || "";
      if (data) {
        onChangeAuthReply({ type: "success", message: "Account created successfully" });
        setTimeout(() => {
          history.replace("/login");
        }, 1000);
      }
      if (error) {
        onChangeAuthReply({ type: "error", message: error });
      }
      setIsLoading(false);
    },
    [
      history,
      onValidateEmail,
      onValidatePassword,
      onChangeAuthReply,
      onResetAuthReply,
      onLoginOrBecomeContributor,
    ]
  );
  useEffect(() => {
    onResetAuthReply();
  }, [onResetAuthReply]);

  return (
    <>
      <h1>Create a FlowNews account</h1>
      <Reply authReply={authReply} onResetAuthReply={onResetAuthReply} />
      <form className={styles.form} onSubmit={becomeContributorHandler}>
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
            {isLoading ? <AuthLoader text="Creating account" /> : "Sign up"}
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
