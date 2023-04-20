import { FaEdit } from "react-icons/fa";
import ProfileBox from "../../../../Header/Navigation/ContributorNavigations/ProfileBox";
import styles from "./ProfilePicture.module.css";
import { useCallback, useContext } from "react";
import { AppContext } from "../../../../../store/App/app-context";

const ProfilePicture = () => {
  const {
    onToggleComponentsIsActive,
    componentsIsActive: { uploadContainerIsActive },
  } = useContext(AppContext);
  const toggleUploadContainer = useCallback(
    (event) => {
      event.stopPropagation();
      onToggleComponentsIsActive({ type: "uploadContainer", event: "toggle" });
    },
    [onToggleComponentsIsActive]
  );

  return (
    <section className={styles.profile_picture}>
      <p>Profile picture</p>
      <ProfileBox className="UserForm__ProfileBox" />
      <button
        onClick={toggleUploadContainer}
        className={uploadContainerIsActive ? styles.active : ""}
      >
        <FaEdit />
        <label htmlFor="userForm_upload_container">Edit</label>
      </button>
      {uploadContainerIsActive && (
        <ul className={styles.upload_container} id="userForm_upload_container">
          <li>Upload a photo...</li>
          <li>Revert Avatar</li>
        </ul>
      )}
      {/* <input type="radio" /> */}
    </section>
  );
};

export default ProfilePicture;
