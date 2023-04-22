import { FaRegEdit } from "react-icons/fa";
import ProfileBox from "../../../../Header/Navigation/ContributorNavigations/ProfileBox";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../../../../store/App/app-context";
import UploadPhotoContainer from "./UploadPhotoContainer";
import styles from "./ProfilePicture.module.css";

const ProfilePicture = () => {
  const [error, setError] = useState("Please upload a picture smaller than 1MB 2222222222222222222 2222");
  const {
    onToggleComponentsIsActive,
    //componentsIsActive: { uploadContainerIsActive },
  } = useContext(AppContext);
  let uploadContainerIsActive = true; //TODO delete this
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
      <UploadPhotoContainer
        onSetError={setErrorHandler}
        onToggleComponentsIsActive={onToggleComponentsIsActive}
        uploadContainerIsActive={uploadContainerIsActive}
      />
    </section>
  );
};

export default ProfilePicture;
