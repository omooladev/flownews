import { FaRegEdit } from "react-icons/fa";
import ProfileBox from "../../../../Header/Navigation/ContributorNavigations/ProfileBox";
import styles from "./ProfilePicture.module.css";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../../../../store/App/app-context";

const ProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState("");
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
  const stopPropagationHandler = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const saveProfilePictureHandler = useCallback((event) => {
    event.stopPropagation();
    onToggleComponentsIsActive({ type: "uploadContainer", event: "close" });
    const file = event.target.files[0];

    console.log(file.size);
  }, []);

  return (
    <section className={styles.profile_picture}>
      <p>Profile picture</p>
      {/* <p>Please upload a picture smaller than 1MB</p> */}
      <ProfileBox className="UserForm__ProfileBox" />
      <button
        onClick={toggleUploadContainer}
        className={uploadContainerIsActive ? styles.active : ""}
      >
        <FaRegEdit />
        <label htmlFor="userForm_upload_container">Edit</label>
      </button>
      {uploadContainerIsActive && (
        <ul className={styles.upload_container} id="userForm_upload_container">
          <li onClick={stopPropagationHandler}>
            <label htmlFor="userForm_image_input">Upload a photo...</label>
          </li>
          <input
            type="file"
            accept="image/"
            id="userForm_image_input"
            onClick={stopPropagationHandler}
            onChange={saveProfilePictureHandler}
          />
        </ul>
      )}
    </section>
  );
};

export default ProfilePicture;
