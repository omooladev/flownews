import { useCallback } from "react";
import styles from "./ProfileFollow.module.css";
import { useHistory } from "react-router-dom/";
const ProfileFollow = (props) => {
  //----------> Get the current location pathname of the user
  const history = useHistory();
  //----------> get the followers and the following of the contributor
  const { followers, following } = props;
  console.log(followers, following);

  const clickFollowHandler = useCallback(
    ({ path }) => {
      history.push(`${history.location.pathname}${path}`);
    },
    [history]
  );
  return (
    <section className={styles.follow}>
      <span className={styles.followers} onClick={() => clickFollowHandler({ path: "/followers" })}>
        <h4>{followers.length}</h4>
        <label>followers</label>
      </span>
      <span className={styles.following} onClick={() => clickFollowHandler({ path: "/following" })}>
        <h4>{following.length}</h4>
        <label>following</label>
      </span>
    </section>
  );
};

export default ProfileFollow;
