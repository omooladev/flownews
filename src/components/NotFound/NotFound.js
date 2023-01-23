import { NavLink } from "react-router-dom";
import styles from "./NotFound.module.css";
const NotFound = () => {
  return (
    <section className={styles.not_found}>
      <h1>Page Not Found</h1>
      <p>You might not have permissions to see this page</p>
      <NavLink to="/login">Log in</NavLink>
    </section>
  );
};

export default NotFound;
