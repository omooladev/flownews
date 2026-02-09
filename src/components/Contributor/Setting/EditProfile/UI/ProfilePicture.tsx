//<---------- IMPORT MODULES ---------->

import ProfileBox from "../../../../../UI/ProfileBox";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../../../../store/App/app-context";
import UploadPhotoContainer from "./UploadPhotoContainer";
import styles from "./ProfilePicture.module.css";

const ProfilePicture = () => {
  //-----------> set the state of the error
  const [error, setError] = useState("");
  const {
    onToggleComponentsIsActive,
    componentsIsActive: { uploadContainerIsActive },
  } = useContext(AppContext);

  const toggleUploadContainer = useCallback(
    (event) => {
      event.stopPropagation();
      setError("");
      onToggleComponentsIsActive({ type: "uploadContainer", event: "toggle" });
    },
    [onToggleComponentsIsActive]
  );

  const setErrorHandler = useCallback((error) => {
    setError(error);
  }, []);

  return (
    <section className={styles.profile_picture}>
      <p className={styles.profile_picture_header}>Profile picture</p>
      <span className={`${styles.error} ${error ? styles.show : ""}`}>{error}</span>
      {/*THE PROFILE BOX WHICH CONTAINS EITHER THE PROFILE PICTURE OR SHORT FORM OF THE USERNAME */}
      <ProfileBox
        className="UserForm__ProfileBox"
        uploadContainerIsActive={uploadContainerIsActive}
        onToggleUploadContainer={toggleUploadContainer}
        options={{ showEditButton: true }}
      />
      {/*UPLOAD CONTAINER WHICH CONTAINS CONTROL FOR UPLOADING AND REMOVING PROFILE PICTURE */}
      <UploadPhotoContainer
        onSetError={setErrorHandler}
        onToggleComponentsIsActive={onToggleComponentsIsActive}
        uploadContainerIsActive={uploadContainerIsActive}
      />
    </section>
  );
};

export default ProfilePicture;
