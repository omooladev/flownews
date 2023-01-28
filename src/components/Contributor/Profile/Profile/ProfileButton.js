import styles from "./ProfileButton.module.css"
const ProfileButton = () => {
  return (
    <section className={styles.edit_profile_button_container}>
      <button className={styles.edit_profile_button}>Edit profile</button>
    </section>
  );
};

export default ProfileButton;
