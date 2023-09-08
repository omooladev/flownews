import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./ProfileButton.module.css";
import { AuthContext } from "../../../../store/Auth/auth-context";
const ProfileButton = () => {
  const history = useHistory();
  //----------> get the contributor details that you are searching for from the auth store
  const { searchedContributorData, onToggleFollowContributor } = useContext(AuthContext);
  //----------> check if the searched username exist
  const searchedContributorExist = searchedContributorData.username;
  const clickEditProfileHandler = useCallback(() => {
    history.push("/settings/profile");
  }, [history]);

  //----------> function for following a contributor
  const followContributorHandler = useCallback(() => {
    onToggleFollowContributor({ action: "follow" });
  }, [onToggleFollowContributor]);
  return (
    <section className={styles.edit_profile_button_container}>
      {/* if searched contributor is not found then we know that you're on your profile page
      so we display the edit profile button */}
      {!searchedContributorExist && (
        <button className={styles.edit_profile_button} onClick={clickEditProfileHandler}>
          Edit profile
        </button>
      )}
      {/* if searched contributor is found then we know that you're on your profile page
      so we display the follow button */}
      {searchedContributorExist && (
        <button className={styles.edit_profile_button} onClick={followContributorHandler}>
          Follow
        </button>
      )}
    </section>
  );
};

export default ProfileButton;
