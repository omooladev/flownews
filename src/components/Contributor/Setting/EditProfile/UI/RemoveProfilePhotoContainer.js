import { useCallback } from "react";
import styles from "./RemoveProfilePhotoContainer.module.css";
const RemoveProfilePhotoContainer = ({ onRemoveProfilePhotoContainer }) => {
  const closeProfilePhotoContainer = useCallback(() => {
    onRemoveProfilePhotoContainer();
  }, [onRemoveProfilePhotoContainer]);
  return (
    <section className={styles.remove_profile_photo_container}>
      <p className={styles.header}>Are you sure you want to remove your profile photo?</p>
      <div className={styles.buttons}>
        <button>Yes</button>
        <button type="button" onClick={closeProfilePhotoContainer}>
          Cancel
        </button>
      </div>
    </section>
  );
};

export default RemoveProfilePhotoContainer;
