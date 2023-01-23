import { NavLink } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import ProfileBox from "../../Contributor/Profile/ProfileSection/ProfileBox";
import styles from "./ContributorNavigation.module.css";
const ContributorNavigation = (props) => {
  const history = useHistory();
  const { isLoggedIn, userData } = props;
  return (
    <>
      {isLoggedIn && (
        <>
          <ProfileBox
            className={styles.profile_box}
            onClick={() => {
              history.replace(`/@${userData.username}`);
            }}
          />
          <li className={styles.notification}>
            <NavLink to="/me/notifications">
              <FaRegBell className={styles.icon} />
            </NavLink>
          </li>
          <li className={styles.sign_out}>
            <NavLink to="/signout">Sign out</NavLink>
          </li>
        </>
      )}
    </>
  );
};

export default ContributorNavigation;
