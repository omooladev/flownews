import { useCallback, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../store/App/app-context";
import { BiX } from "react-icons/bi";
import Card from "../../UI/Card";
import PopUp from "../../UI/PopUp";
import styles from "./Login.module.css";

const Login = () => {
  const { onPopUp } = useContext(AppContext);
  const closePopUpHandler = useCallback(() => {
    return onPopUp({ state: false, type: "", from: "" });
  }, [onPopUp]);
  return (
    <PopUp onClick={closePopUpHandler} className={`auth_popup ${styles.login}`}>
      <h1>Sign in to Flownews</h1>
      <Card className={styles.reply}>
        <p>Here is where the reply will appear</p>
        <BiX />
      </Card>

      <form className={styles.form}>
        <div className={styles.form_control}>
          <label>Email Address</label>
          <input type="email" />
        </div>
        <div className={styles.form_control}>
          <div className={styles.password_label}>
            <label>Password</label>
            <NavLink to="/forgot-password">Forgot password?</NavLink>
          </div>
          <input type="password" />
        </div>
        <div className={styles.form_actions}>
          <button type="submit">Sign in</button>
        </div>
      </form>
      <div className={styles.form_footer}>
        <p>New to Flownews?</p>
        <NavLink to="/become-contributor">Create an account</NavLink>
      </div>
    </PopUp>
  );
};

export default Login;
