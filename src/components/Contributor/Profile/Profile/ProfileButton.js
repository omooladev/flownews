import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styles from "./ProfileButton.module.css";
const ProfileButton = () => {
  const history = useHistory();

  const clickEditProfileHandler = useCallback(() => {
    history.push("/settings/profile");
  }, [history]);
  return (
    <section className={styles.edit_profile_button_container}>
      <button className={styles.edit_profile_button} onClick={clickEditProfileHandler}>
        Edit profile
      </button>
    </section>
  );
};

export default ProfileButton;
