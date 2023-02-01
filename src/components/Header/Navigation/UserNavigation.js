//? NOTE---All navigation links here are for the normal users
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../store/App/app-context";
import MobileNavigation from "./MobileNavigation";
import styles from "./UserNavigation.module.css";
const UserNavigation = () => {

  const { onCloseMenu } = useContext(AppContext);
  const userLinks = ["home", "news", "blog", "celebrity", "food", "make-up"];
  return (
    <>
      {userLinks.map((link) => {
        return (
          <li className={styles["navigation-link"]} key={link}>
            <NavLink to={`/${link}`} onClick={onCloseMenu} activeClassName={styles["active-link"]}>
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
