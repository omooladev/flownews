//<---------- IMPORT MODULES ---------->
import { useCallback, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";
import { FaChevronDown, FaRegEdit } from "react-icons/fa";
import styles from "./ProfileBox.module.css";

const defaultOptions = {
  showIcon: false,
  showText: false,
  showUsername: false,
  showEditButton: false,
  showYourPersonalAccountText: false,
};
const ProfileBox = ({ options, className, uploadContainerIsActive, onToggleUploadContainer, onClick }) => {
  //----------> get the contributor Data
  const { contributorData, onSaveContributorData } = useContext(AuthContext);
  let {
    showIcon = false,
    showUsername = false,
    showText = false,
    showEditButton = false,
    showYourPersonalAccountText = false,
  } = options || defaultOptions;

  const contributorUsernameCut = contributorData.username[0];
  const contributorFullUsername = contributorData.username;
  const contributorProfilePicture = ""; //contributorData.profilePicture || "";

  const customClass = className ? `${styles[className]}` : "";

  const handleProfilePictureError = useCallback(() => {
    onSaveContributorData({ profilePicture: null });
  }, [onSaveContributorData]);

  return (
    <section onClick={onClick} className={`${styles.profile_box} ${customClass}`}>
      <div className={styles.profilePicture_Username}>
        {contributorProfilePicture ? (
          <img
            src={contributorProfilePicture}
            alt="contributor profile"
            className={styles.profile_picture}
            onError={handleProfilePictureError}
          />
        ) : (
          `${contributorUsernameCut}`
        )}
      </div>
      {showIcon && <FaChevronDown className={styles.icon} />}
      {showText && (
        <div className={styles.profile_box_text}>
          {showUsername && <label className={styles.username}>{contributorFullUsername}</label>}
          {showYourPersonalAccountText && (
            <h5 className={styles.your_personal_account}>Your personal account</h5>
          )}
        </div>
      )}
      {/* This is the configuration for the profile box that appears on the user form gotten from */}
      {showEditButton && (
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
