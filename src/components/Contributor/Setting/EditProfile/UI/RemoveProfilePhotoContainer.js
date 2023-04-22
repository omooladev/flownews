import styles from "./RemoveProfilePhotoContainer.module.css";
const RemoveProfilePhotoContainer = () => {
  return (
    <section className={styles.remove_profile_photo_container}>
      <p className={styles.header}>Are you sure you want to remove your profile photo?</p>
      <div className={styles.buttons}>
        <button>Yes</button>
        <button>Cancel</button>
      </div>
    </section>
  );
};

export default RemoveProfilePhotoContainer;
