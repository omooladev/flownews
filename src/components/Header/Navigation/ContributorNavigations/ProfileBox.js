//<---------- IMPORT MODULES ---------->
import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { FaChevronDown, FaRegEdit } from "react-icons/fa";
import styles from "./ProfileBox.module.css";

const ProfileBox = (props) => {
  //----------> get the properties
  const { location, uploadContainerIsActive, onToggleUploadContainer, from, onClick } = props;
  //----------> get the contributor Data
  const { contributorData } = useContext(AuthContext);

  const contributorUsernameCut = contributorData.username[0];
  const contributorFullUsername = contributorData.username;
  const contributorProfilePicture = contributorData.profilePicture || "";

  const className = `${styles[props.className]}` || "";

  return (
    <section onClick={onClick} className={`${styles.profile_box} ${className}`}>
      <div className={styles.profilePicture_Username}>
        {contributorProfilePicture ? (
          <img
            src={contributorProfilePicture}
            alt="contributor profile"
            className={styles.profile_picture}
          />
        ) : (
          `${contributorUsernameCut}`
        )}
      </div>
      {from !== "user-form" && <FaChevronDown className={styles.icon} />}
      {from !== "user-form" && (
        <div className={styles.profile_box_text}>
          <label className={styles.username}>{contributorFullUsername}</label>
          {location === "setting" && <h5 className={styles.your_personal_account}>Your personal account</h5>}
        </div>
      )}
      {/* This is the configuration for the profile box that appears on the user form gotten from */}
      {from === "user-form" && (
        <button
          onClick={onToggleUploadContainer}
          className={`${styles.upload_container_button} ${uploadContainerIsActive ? styles.active : ""}`}
        >
          <FaRegEdit />
          <span>Edit</span>
        </button>
      )}
    </section>
  );
};

export default ProfileBox;
