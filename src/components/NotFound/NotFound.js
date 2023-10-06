import React, { useCallback, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { AuthContext } from "../../store/Auth/auth-context";
import styles from "./NotFound.module.css";
import { useHistory } from "react-router-dom";
const NotFound = () => {
  useTitle("Page Not Found");
  const history = useHistory();
  const { isLoggedIn, onResetContributorError } = useContext(AuthContext);

  const returnToHomePageHandler = useCallback(() => {
    onResetContributorError();
    history.push("/home");
  }, [onResetContributorError,history]);

  return (
    <section className={styles.not_found}>
      <h1>Page Not Found</h1>
      <p>You might not have permissions to see this page</p>
      {!isLoggedIn && <NavLink to="/login">Log in</NavLink>}
      {isLoggedIn && <button onClick={returnToHomePageHandler}>Return To Home Page</button>}
    </section>
  );
};

export default NotFound;
