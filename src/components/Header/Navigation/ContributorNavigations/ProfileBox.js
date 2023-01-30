import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { FaChevronDown } from "react-icons/fa";
import styles from "./ProfileBox.module.css";

const ProfileBox = (props) => {
  const { location } = props;
  const { userData } = useContext(AuthContext);
  const contributorUsernameCut = userData.username[0];
  const contributorFullUsername = userData.username;
  const contributorProfilePicture = userData.profilePicture || "";

  const className = props.className || "";
  return (
    <div onClick={props.onClick} className={`${styles.profile_box} ${className}`}>
      {contributorProfilePicture ? (
        <img src={contributorProfilePicture} alt="contributor" className={styles.profile_picture} />
      ) : (
        <p>{contributorUsernameCut}</p>
      )}
      <FaChevronDown className={styles.icon} />
      <div className={styles.profile_box_text}>
        <label className={styles.username}>{contributorFullUsername}</label>
        {location === "setting" && (
          <h5 className={styles.your_personal_account}>Your personal account</h5>
        )}
      </div>
    </div>
  );
};

export default ProfileBox;
