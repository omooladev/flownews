import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Follow.module.css";

const Follow = (props) => {
  //----------> access the useHistory method
  const history = useHistory();
  //----------> get the follow path and username
  const { followPath, username } = props;

  const clickFollowHandler = useCallback(
    ({ path }) => {
      if (followPath === path) {
        return;
      }
      history.push(`${path}`);
    },
    [followPath, history,username]
  );
  return (
    <section className={styles["follow-container"]}>
      <nav>
        {/* Followers you know are people you are following that are followers of the contributor */}
        <li className={followPath === "followers_you_know" ? styles.active : ""}>
          Followers you know
        </li>
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
      <hr />
    </section>
  );
};

export default Follow;
