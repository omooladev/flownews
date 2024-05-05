import { useCallback } from "react";
import styles from "./RemoveProfilePhotoContainer.module.css";
const RemoveProfilePhotoContainer = (props) => {
  //----------> get the
  const { onToggleComponentsIsActive, onSaveContributorData, onHideRemoveProfilePhotoContainer, onClick } =
    props;
  const closeProfilePhotoContainer = useCallback(() => {
    onHideRemoveProfilePhotoContainer();
  }, [onHideRemoveProfilePhotoContainer]);
  const removeProfilePhotoHandler = useCallback(() => {
    //TODO send a request to delete the profile picture
    onSaveContributorData({ profilePicture: null });
    onToggleComponentsIsActive({ type: "uploadContainer", event: "close" });
  }, [onSaveContributorData, onToggleComponentsIsActive]);
  return (
    <section className={styles.remove_profile_photo_container} onClick={onClick}>
      <p className={styles.header}>Are you sure you want to remove your profile photo?</p>
      <div className={styles.actions}>
        <button type="button" onClick={removeProfilePhotoHandler}>
          Yes
        </button>
        <button type="button" onClick={closeProfilePhotoContainer}>
          No
        </button>
      </div>
    </section>
  );
};

export default RemoveProfilePhotoContainer;
