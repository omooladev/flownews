//? NOTE---All navigation links here are for the normal users
import { NavLink } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";
import styles from "./UserNavigation.module.css";
const UserNavigation = (props) => {
  const userLinks = ["home", "news", "blog", "celebrity", "food", "make-up"];
  return (
    <>
      {userLinks.map((link) => {
        return (
          <li className={styles["navigation-link"]} key={link}>
            <NavLink to={`/${link}`} activeClassName={styles["active-link"]}>
              {link}
            </NavLink>
          </li>
        );
      })}
      <MobileNavigation />
    </>
  );
};

export default UserNavigation;