import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { FaChevronDown } from "react-icons/fa";
import styles from "./ProfileBox.module.css";

const ProfileBox = (props) => {
  const { userData } = useContext(AuthContext);
  const contributorUsernameCut = userData.user.username[0];
  const contributorFullUsername = userData.user.username;
  const contributorProfilePicture = userData.user.profilePicture || "";

  const className = props.className || "";
  return (
    <div onClick={props.onClick} className={`${styles.profile_box} ${className}`}>
      {contributorProfilePicture ? (
        <img src={contributorProfilePicture} alt="contributor" className={styles.profile_picture} />
      ) : (
        <p>{contributorUsernameCut}</p>
      )}
      <FaChevronDown className={styles.icon} />
      <label className={styles.username}>{contributorFullUsername}</label>
    </div>
  );
};

export default ProfileBox;
