import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { AuthContext } from "../../store/Auth/auth-context";
import styles from "./NotFound.module.css";
const NotFound = () => {
  useTitle("Page Not Found");
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <section className={styles.not_found}>
      <h1>Page Not Found</h1>
      <p>You might not have permissions to see this page</p>
      {!isLoggedIn && <NavLink to="/login">Log in</NavLink>}
    </section>
  );
};

export default NotFound;
