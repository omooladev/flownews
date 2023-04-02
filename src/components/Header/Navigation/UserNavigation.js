//? NOTE---All navigation links here are for the normal users
import React, { useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../store/App/app-context";
import MobileNavigation from "./MobileNavigation";
import styles from "./UserNavigation.module.css";
const UserNavigation = () => {
  const { onToggleComponentsIsActive } = useContext(AppContext);
  const userLinks = ["home", "news", "blog", "celebrity", "food", "make-up"];

  const closeMenuHandler = useCallback(() => {
    onToggleComponentsIsActive({ type: "menu", event: "close" });
  }, [onToggleComponentsIsActive]);
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
      <MobileNavigation onToggleComponentsIsActive={onToggleComponentsIsActive} />
    </>
  );
};

export default React.memo(UserNavigation);
