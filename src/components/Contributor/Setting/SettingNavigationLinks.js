import { NavLink } from "react-router-dom";
import { BiUser, BiCog, BiEnvelope, BiShieldX } from "react-icons/bi";
import { FaPaintBrush, FaRegBell } from "react-icons/fa";

import styles from "./SettingNavigationLinks.module.css";
const SettingNavigationLinks = () => {
  const links = [
    { text: "Public profile", icon: <BiUser className={styles.icon} />, to: "profile" },
    { text: "Account", icon: <BiCog className={styles.icon} />, to: "account" },
    { text: "Appearance", icon: <FaPaintBrush className={styles.icon} />, to: "appearance" },
    {
      text: "Notifications",
      icon: <FaRegBell className={styles.icon} />,
      to: "notifications",
    },
  ];
  const accessLinks = [
    { text: "Email", icon: <BiEnvelope className={styles.icon} />, to: "email" },
    {
      text: "Password and authentication",
      icon: <BiShieldX className={styles.icon} />,
      to: "security",
    },
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
        <div className={styles.link_section}>
          <h4 className={styles.link_header}>Access</h4>
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
