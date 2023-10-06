import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styles from "./FollowHeader.module.css";
const FollowHeader = ({ followPath, searchedContributorData }) => {
  //----------> access the useHistory method
  const history = useHistory();
  const clickFollowHandler = useCallback(
    ({ path }) => {
      if (followPath === path) {
        return;
      }
      history.push(`${path}`);
    },
    [followPath, history]
  );
  return (
    <nav className={styles["follow-navigation"]}>
      {/* Followers you know are people you are following that are followers of the contributor */}
      {searchedContributorData.username && (
        <li className={followPath === "followers_you_know" ? styles.active : ""}>
          Followers you know
        </li>
      )}
      <li
        className={followPath === "followers" ? styles.active : ""}
        onClick={() => clickFollowHandler({ path: "followers" })}
      >
        Followers
      </li>
      <li
        className={followPath === "following" ? styles.active : ""}
        onClick={() => clickFollowHandler({ path: "following" })}
      >
        Following
      </li>
    </nav>
  );
};

export default FollowHeader;
