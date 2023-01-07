import { useCallback, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AppContext } from "../../store/App/app-context";

// import { BiX } from "react-icons/bi";
// import Card from "../../UI/Card";
import PopUp from "../../UI/PopUp";
import styles from "./Auth.module.css";

const Auth = () => {
  const { lastLocation } = useContext(AppContext);
  const history = useHistory();
  const location = history.location.pathname;
  const loginLocation = location.includes("/login");
  const becomeContributorLocation = location.includes("/become-contributor");

  const closePopUpHandler = useCallback(() => {
    return history.replace(lastLocation);
  }, [history, lastLocation]);
  return (
    <PopUp onClick={closePopUpHandler} className={`auth_popup ${styles.login}`}>
      {loginLocation && <h1>Log in to FlowNews</h1>}
      {becomeContributorLocation && <h1>Create a FlowNews account</h1>}
      {/* <Card className={styles.reply}>
        <p>Here is where the reply will appear</p>
        <BiX />
      </Card> */}

      <form className={styles.form}>
        <div className={styles.form_control}>
          <label>Email Address</label>
          <input type="email" />
        </div>
        <div className={styles.form_control}>
          <div className={styles.password_label}>
            <label>Password</label>
            {loginLocation && <NavLink to="/forgot-password">Forgot password?</NavLink>}
          </div>
          <input type="password" />
        </div>
        <div className={styles.form_actions}>
          <button type="submit">{`${loginLocation ? "Log in" : "Sign up"}`}</button>
        </div>
      </form>
      <div className={styles.form_footer}>
        {loginLocation && (
          <>
            <p>New to FlowNews?</p>
            <NavLink to="/auth/become-contributor">Create an account</NavLink>
          </>
        )}
        {becomeContributorLocation && (
          <>
            <p>Already have an account?</p>
            <NavLink to="/auth/login">Log in</NavLink>
          </>
        )}
      </div>
    </PopUp>
  );
};

export default Auth;
