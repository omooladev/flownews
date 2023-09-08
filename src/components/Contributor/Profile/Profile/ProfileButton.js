import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./ProfileButton.module.css";
import { AuthContext } from "../../../../store/Auth/auth-context";
const ProfileButton = () => {
  const history = useHistory();
  //----------> get the contributor details that you are searching for from the auth store
  const { searchedContributorData } = useContext(AuthContext);
  const clickEditProfileHandler = useCallback(() => {
    history.push("/settings/profile");
  }, [history]);
  return (
    <section className={styles.edit_profile_button_container}>
      {/* if searched contributor is not found then we know that you're on your profile page
      so we display the edit profile button */}
      {!searchedContributorData && (
        <button className={styles.edit_profile_button} onClick={clickEditProfileHandler}>
          Edit profile
        </button>
      )}
      {/* if searched contributor is not found then we know that you're on your profile page
      so we display the follow button */}
      {searchedContributorData && <button className={styles.edit_profile_button}>Follow</button>}
    </section>
  );
};

export default ProfileButton;
