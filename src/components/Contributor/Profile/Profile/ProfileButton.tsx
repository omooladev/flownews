import styles from "./ProfileButton.module.css";

import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../../../store/Auth/auth-context";

const ProfileButton = ({ config }) => {
  const {
    caller,
    isFollowed,
    username: followUsername,
  } = config ? config : { caller: null, isFollowed: null, username: null };
  const history = useHistory();

  //----------> access the auth store
  const { contributorData, searchedContributorData, onToggleFollowContributor } =
    useContext(AuthContext);

  //----------> states
  const [isFollowingButtonHovered, setIsFollowingButtonHovered] = useState(false);

  //----------> check if the searched username exist
  const searchedContributorExist = searchedContributorData.username;
  //? <---------------  FUNCTIONS  --------------->

  const clickEditProfileHandler = useCallback(() => {
    history.push("/settings/profile");
  }, [history]);

  const followContributorHandler = useCallback(() => {
    onToggleFollowContributor({ action: "follow" });
  }, [onToggleFollowContributor]);

  const unfollowContributorHandler = useCallback(() => {
    onToggleFollowContributor({ action: "unfollow" });
  }, [onToggleFollowContributor]);

  const toggleIsFollowingButtonHovered = useCallback(() => {
    setIsFollowingButtonHovered((prevState) => !prevState);
  }, []);
  return (
    <section className={styles.profile_button_container}>
      {/* if searched contributor is not found then we know that you're on your profile page
      so we display the edit profile button */}
      {!searchedContributorExist && !caller && (
        <button
          className={`${styles.profile_button} ${styles.edit_profile}`}
          onClick={clickEditProfileHandler}
        >
          Edit profile
        </button>
      )}
      {/* if searched contributor is found or caller is from the contributor-container */}
      {(searchedContributorExist || caller) && contributorData.username !== followUsername && (
        <>
          {!contributorData.isFollowingSearchedContributor && !isFollowed && (
            <button
              className={`${styles.profile_button} ${styles.follow}`}
              onClick={followContributorHandler}
            >
              Follow
            </button>
          )}
          {/* If the contributor is following the contributor that he is searching for */}
          {(contributorData.isFollowingSearchedContributor || isFollowed) &&
            contributorData.username !== followUsername && (
              <button
                className={`${styles.profile_button} ${
                  isFollowingButtonHovered ? styles.unfollow : styles.following
                }`}
                onClick={unfollowContributorHandler}
                onMouseEnter={toggleIsFollowingButtonHovered}
                onMouseOut={toggleIsFollowingButtonHovered}
              >
                {isFollowingButtonHovered ? "Unfollow" : "Following"}
              </button>
            )}
        </>
      )}
    </section>
  );
};

export default ProfileButton;
