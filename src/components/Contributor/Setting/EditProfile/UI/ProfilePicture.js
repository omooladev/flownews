import { FaRegEdit } from "react-icons/fa";
import ProfileBox from "../../../../Header/Navigation/ContributorNavigations/ProfileBox";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../store/App/app-context";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import styles from "./ProfilePicture.module.css";
const ProfilePicture = () => {
  //min-width:1400px
  const [profilePicture, setProfilePicture] = useState("");
  const [removeProfilePhotoContainerIsActive, setRemoveProfilePhotoContainerIsActive] =
    useState(false);
  const [error, setError] = useState("");
  const {
    onToggleComponentsIsActive,
    componentsIsActive: { uploadContainerIsActive },
  } = useContext(AppContext);
  const {
    onSaveContributorData,
    contributorData: { profilePicture: displayPicture },
  } = useContext(AuthContext);

  const removeProfilePhotoHandler = useCallback((event) => {
    event.stopPropagation();
    setRemoveProfilePhotoContainerIsActive(true);
  }, []);
  const toggleUploadContainer = useCallback(
    (event) => {
      event.stopPropagation();
      setError("");
      onToggleComponentsIsActive({ type: "uploadContainer", event: "toggle" });
    },
    [onToggleComponentsIsActive]
  );
  const stopPropagationHandler = useCallback((event) => {
    event.stopPropagation();
  }, []);
  const transformFile = useCallback(async (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => setProfilePicture(reader.result);
    }
  }, []);

  const saveProfilePictureHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      onToggleComponentsIsActive({ type: "uploadContainer", event: "close" });

      let file = event.target.files[0];
      const imageType = file.type;
      const maxSize = 1024 * 1024; //? This is 1MB
      const imageSize = file.size;
      if (!imageType.includes("image/")) {
        return setError("Please upload an image");
      }

      if (imageSize > maxSize) {
        return setError("Please upload a picture smaller than 1MB");
      }
      await transformFile(file);
    },
    [onToggleComponentsIsActive, transformFile]
  );

  useEffect(() => {
    if (profilePicture) {
      //TODO send a request to save the profile picture on the database
      onSaveContributorData({ profilePicture });
    }
  }, [profilePicture, onSaveContributorData]);
  return (
    <section className={styles.profile_picture}>
      <p>Profile picture</p>
      <span className={`${styles.error} ${error ? styles.show : ""}`}>
        {error || "Error will appear here"}
      </span>
      <ProfileBox className="UserForm__ProfileBox" />
      <button
        onClick={toggleUploadContainer}
        className={`${styles.upload_container_button} ${
          uploadContainerIsActive ? styles.active : ""
        }`}
      >
        <FaRegEdit />
        <span>Edit</span>
      </button>
      {uploadContainerIsActive && (
        <ul className={styles.upload_container} id="userForm_upload_container">
          <li onClick={stopPropagationHandler}>
            <label htmlFor="userForm_image_input">Upload a photo...</label>
          </li>
          {displayPicture && (
            <li onClick={removeProfilePhotoHandler}>
              <label>Remove Profile photo</label>
              {removeProfilePhotoContainerIsActive && uploadContainerIsActive && (
                <section className={styles.remove_profile_photo_container}>
                  <p className={styles.header}>
                    Are you sure you want to remove your profile photo?
                  </p>
                  <div className={styles.buttons}>
                    <button>Yes</button>
                    <button>Cancel</button>
                  </div>
                </section>
              )}
            </li>
          )}
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
