import { useCallback } from "react";
import styles from "./RemoveProfilePhotoContainer.module.css";
const RemoveProfilePhotoContainer = (props) => {
  //----------> get the
  const { onHideRemoveProfilePhotoContainer, onRemoveProfilePhoto, onClick } = props;
  const closeProfilePhotoContainer = useCallback(() => {
    onHideRemoveProfilePhotoContainer();
  }, [onHideRemoveProfilePhotoContainer]);
  return (
    <section className={styles.remove_profile_photo_container} onClick={onClick}>
      <p className={styles.header}>Are you sure you want to remove your profile photo?</p>
      <div className={styles.actions}>
        <button type="button" onClick={onRemoveProfilePhoto}>
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
