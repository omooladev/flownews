import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import styles from "./UploadPhotoContainer.module.css";
import RemoveProfilePhotoContainer from "./RemoveProfilePhotoContainer";
const UploadPhotoContainer = ({
  onSetError,
  onToggleComponentsIsActive,
  uploadContainerIsActive,
}) => {
  //min-width:1400px
  const [profilePicture, setProfilePicture] = useState("");
  const [removeProfilePhotoContainerIsActive, setRemoveProfilePhotoContainerIsActive] =
    useState(false);

  const {
    onSaveContributorData,
    contributorData: { profilePicture: displayPicture },
  } = useContext(AuthContext);
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
        return onSetError("Please upload an image");
      }

      if (imageSize > maxSize) {
        return onSetError("Please upload a picture smaller than 1MB");
      }
      await transformFile(file);
    },
    [onToggleComponentsIsActive, transformFile, onSetError]
  );

  const removeProfilePhotoHandler = useCallback((event) => {
    event.stopPropagation();
    setRemoveProfilePhotoContainerIsActive(true);
  }, []);
  const stopPropagationHandler = useCallback((event) => {
    event.stopPropagation();
  }, []);
  useEffect(() => {
    if (profilePicture) {
      //TODO send a request to save the profile picture on the database
      onSaveContributorData({ profilePicture });
    }
  }, [profilePicture, onSaveContributorData]);
  return (
    <>
      {uploadContainerIsActive && (
        <ul className={styles.upload_container} id="userForm_upload_container">
          <li onClick={stopPropagationHandler}>
            <label htmlFor="userForm_image_input">Upload a photo...</label>
          </li>
          {displayPicture && (
            <li onClick={removeProfilePhotoHandler}>
              <label>Remove Profile photo</label>
              {removeProfilePhotoContainerIsActive && uploadContainerIsActive && (
                <RemoveProfilePhotoContainer />
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
    </>
  );
};

export default UploadPhotoContainer;
