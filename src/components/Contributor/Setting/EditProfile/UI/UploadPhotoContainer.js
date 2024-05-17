//<---------IMPORT MODULES ---------->
import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import RemoveProfilePhotoContainer from "./RemoveProfilePhotoContainer";
import styles from "./UploadPhotoContainer.module.css";
import { configuration } from "../../../../../config";
import CropContainer from "../../../../../UI/CropContainer";

const UploadPhotoContainer = ({ onSetError, onToggleComponentsIsActive, uploadContainerIsActive }) => {
  //----------> get data from the auth context
  const {
    onSaveContributorData,
    onChangeProfilePicture,
    contributorData: { profilePicture: displayPicture },
  } = useContext(AuthContext);
  //---------> get the maximum size if the profile picture from the configuration
  const { maxProfilePictureSize } = configuration;
  const [profilePicture, setProfilePicture] = useState(displayPicture);
  const [removeProfilePhotoContainerIsActive, setRemoveProfilePhotoContainerIsActive] = useState(false);

  //<--------- FUNCTIONS STARTS HERE---------->
  //----------> transform file
  const transformFile = useCallback(
    async (file) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const profilePicture = reader.result;
          setProfilePicture(profilePicture);
          // onSaveContributorData({ profilePicture });
          // onChangeProfilePicture({ action: "save", profilePicture: file }).then(({ error, data }) => {
          //   if (error === "File too large") {
          //     return onSetError(
          //       `Failed to save profile picture, Please upload a picture smaller than ${maxProfilePictureSize
          //         .toString()
          //         .slice(0, 1)}MB`
          //     );
          //   }
          //   if (error) {
          //     return onSetError(error);
          //   }
          //   if (data) {
          //     onSaveContributorData(data);
          //   }
          // });
        };
      }
    },
    [onSaveContributorData, onChangeProfilePicture, onSetError, maxProfilePictureSize]
  );
  //----------> save profile picture
  const saveProfilePictureHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      //----------> close the upload container
      onToggleComponentsIsActive({ type: "uploadContainer", event: "close" });
      //----------> get the image file
      let file = event.target.files[0];
      const imageType = file.type;
      const imageSize = file.size;
      if (!imageType.includes("image/")) {
        return onSetError("Please upload an image");
      }

      if (imageSize > maxProfilePictureSize) {
        return onSetError(
          `Please upload a picture smaller than ${maxProfilePictureSize.toString().slice(0, 1)}MB`
        );
      }
      await transformFile(file);
    },
    [onToggleComponentsIsActive, transformFile, onSetError, maxProfilePictureSize]
  );
  const removeProfilePhotoHandler = useCallback(() => {
    if (profilePicture) {
      setProfilePicture(null);
      onSaveContributorData({ profilePicture: null });
      onToggleComponentsIsActive({ type: "uploadContainer", event: "close" });
      onChangeProfilePicture({ action: "remove", profilePicture });
    }
  }, [onSaveContributorData, onToggleComponentsIsActive, profilePicture, onChangeProfilePicture]);

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

  //<--------- FUNCTIONS ENDS HERE---------->
  useEffect(() => {
    if (!uploadContainerIsActive && removeProfilePhotoContainerIsActive) {
      hideRemoveProfilePhotoContainer();
    }
  }, [uploadContainerIsActive, removeProfilePhotoContainerIsActive, hideRemoveProfilePhotoContainer]);
  return (
    <>
      {uploadContainerIsActive && (
        <section className={styles.upload_container} id="userForm_upload_container">
          <ul className={styles["upload-controls"]}>
            <li onClick={stopPropagationHandler}>
              <label htmlFor="userForm_image_input">Upload a photo...</label>
            </li>
            {displayPicture && (
              <li onClick={showRemoveProfilePhotoContainer}>
                <label>Remove Profile photo</label>
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
          {/* IF display picture exist and the remove profile photo container is active and the upload container is also active we display
the remove profile photo container */}
          {displayPicture && removeProfilePhotoContainerIsActive && uploadContainerIsActive && (
            <RemoveProfilePhotoContainer
              onSaveContributorData={onSaveContributorData}
              onClick={stopPropagationHandler}
              onHideRemoveProfilePhotoContainer={hideRemoveProfilePhotoContainer}
              onToggleComponentsIsActive={onToggleComponentsIsActive}
              onRemoveProfilePhoto={removeProfilePhotoHandler}
            />
          )}
        </section>
      )}
      {profilePicture && <CropContainer image={profilePicture} />}
    </>
  );
};

export default UploadPhotoContainer;
