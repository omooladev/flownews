//? NOTE---All navigation links here are for the normal users
import React, { useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../store/App/app-context";
import MobileNavigation from "./MobileNavigation";
import styles from "./UserNavigation.module.css";
const UserNavigation = () => {
  console.log("user navigation");
  const { onCloseMenu } = useContext(AppContext);
  const userLinks = ["home", "news", "blog", "celebrity", "food", "make-up"];

  const closeMenuHandler = useCallback(() => {
    onCloseMenu();
  }, [onCloseMenu]);
  return (
    <>
      {userLinks.map((link) => {
        return (
          <li className={styles["navigation-link"]} key={link}>
            <NavLink
              to={`/${link}`}
              onClick={closeMenuHandler}
              activeClassName={styles["active-link"]}
            >
              {link}
            </NavLink>
          </li>
        );
      })}
      <MobileNavigation />
    </>
  );
};

export default React.memo(UserNavigation);
