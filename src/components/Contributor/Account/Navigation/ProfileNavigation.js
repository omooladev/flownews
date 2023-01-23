import { NavLink } from "react-router-dom";
import { FaEdit, FaRegBell } from "react-icons/fa";
import styles from "./ProfileNavigation.module.css";
import ProfileSection from "../../Profile/ProfileSection/ProfileSection";

const ProfileNavigation = () => {
  return (
    <section className={styles.profile_navigation}>
      <ul className={styles.navigation}>
        <li className={styles.write}>
          <NavLink to="/new-story">
            <FaEdit className={styles.icon} />
            <p>Write</p>
          </NavLink>
        </li>
        <li className={styles.notification}>
          <NavLink to="/me/notifications">
            <FaRegBell className={styles.icon} />
          </NavLink>
        </li>
      </ul>

      <ProfileSection />
    </section>
  );
};

export default ProfileNavigation;
