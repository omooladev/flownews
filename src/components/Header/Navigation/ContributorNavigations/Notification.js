import { NavLink } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import styles from "./Notification.module.css";
const Notification = (props) => {
  const className = props.className || "";
  return (
    <li className={`${styles.notification} ${className}`}>
      <NavLink to="/me/notifications">
        <FaRegBell className={styles.icon} />
      </NavLink>
    </li>
  );
};

export default Notification;
