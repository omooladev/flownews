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
  const {
    onSaveContributorData,
    contributorData: { profilePicture: displayPicture },
  } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("s");//TODO remove this
  const [removeProfilePhotoContainerIsActive, setRemoveProfilePhotoContainerIsActive] =
    useState(true);//TODO change to false

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

  const showRemoveProfilePhotoContainer = useCallback((event) => {
    event.stopPropagation();
    setRemoveProfilePhotoContainerIsActive((prevState) => true);
  }, []);
  const hideRemoveProfilePhotoContainer = useCallback(() => {
    setRemoveProfilePhotoContainerIsActive((prevState) => false);
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

  useEffect(() => {
    if (!uploadContainerIsActive && removeProfilePhotoContainerIsActive) {
      hideRemoveProfilePhotoContainer();
    }
  }, [
    uploadContainerIsActive,
    removeProfilePhotoContainerIsActive,
    hideRemoveProfilePhotoContainer,
  ]);
  return (
    <>
      {uploadContainerIsActive && (
        <ul className={styles.upload_container} id="userForm_upload_container">
          <li onClick={stopPropagationHandler}>
            <label htmlFor="userForm_image_input">Upload a photo...</label>
          </li>
          {displayPicture && (
            <>
              <li onClick={showRemoveProfilePhotoContainer}>
                <label>Remove Profile photo</label>
              </li>
              {removeProfilePhotoContainerIsActive && uploadContainerIsActive && (
                <RemoveProfilePhotoContainer
                  onClick={stopPropagationHandler}
                  onHideRemoveProfilePhotoContainer={hideRemoveProfilePhotoContainer}
                />
              )}
            </>
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
