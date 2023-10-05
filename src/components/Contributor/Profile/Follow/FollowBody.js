import Contributor from "./Contributor";
import styles from "./FollowBody.module.css";
const FollowBody = ({ followPath, data }) => {
  const { following, followers } = data;
  const contributors = followPath === "following" ? following : followers;

  return (
    <>
      {contributors.length > 0 &&
        contributors.map((contributor) => {
          return <Contributor contributor={contributor} key={contributor._id} />;
        })}
      {contributors.length === 0 && (
        <h3 className={styles.message}>
          {followPath === "following"
            ? "Looks like you're not following anyone yet"
            : "Oops! It looks like you don't have any followers yet. Keep sharing great content, and you'll surely start gaining followers soon!"}
        </h3>
      )}
    </>
  );
};

export default FollowBody;
