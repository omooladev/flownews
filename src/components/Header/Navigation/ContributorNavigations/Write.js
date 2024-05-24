import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import styles from "./Write.module.css";
const Write = (props) => {
  const className = props.className || "";
  return (
    <li className={`${styles.write} ${className}`}>
      <NavLink to="/new-content">
        <FaEdit className={styles.icon} />
        <p>Write</p>
      </NavLink>
    </li>
  );
};

export default Write;
