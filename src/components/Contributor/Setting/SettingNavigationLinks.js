import { NavLink } from "react-router-dom";
import { BiUser, BiCog, BiAccessibility, BiEnvelope } from "react-icons/bi";
import { FaPaintBrush, FaRegBell} from "react-icons/fa";

import styles from "./SettingNavigationLinks.module.css";
const SettingNavigationLinks = () => {
  const links = [
    { text: "Public profile", icon: <BiUser className={styles.icon} />, to: "profile" },
    { text: "Account", icon: <BiCog className={styles.icon} />, to: "admin" },
    { text: "Appearance", icon: <FaPaintBrush className={styles.icon} />, to: "appearance" },
    {
      text: "Accessibility",
      icon: <BiAccessibility className={styles.icon} />,
      to: "accessibility",
    },
    {
      text: "Notifications",
      icon: <FaRegBell className={styles.icon} />,
      to: "notifications",
    },
  ];
  const accessLinks = [
    { text: "Email", icon: <BiEnvelope className={styles.icon} />, to: "email" },
  ];
  return (
    <section className={styles["setting_navigation-links"]}>
      <ul>
        {links.map((link) => {
          return (
            <li key={link.text}>
              <NavLink to={link.to} activeClassName={styles.active}>
                {link.icon}
                <span>{link.text}</span>
              </NavLink>
            </li>
          );
        })}
        <hr />
        <div className={styles.access}>
          <h4>Access</h4>
          {accessLinks.map((link) => {
            return (
              <li key={link.text}>
                <NavLink to={link.to} activeClassName={styles.active}>
                  {link.icon}
                  <span>{link.text}</span>
                </NavLink>
              </li>
            );
          })}
        </div>
      </ul>
    </section>
  );
};

export default SettingNavigationLinks;
