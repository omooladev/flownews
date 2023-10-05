import Contributor from "./Contributor";

const FollowBody = ({ followPath, data }) => {
  const { following, followers } = data;
  const contributors = followPath === "following" ? following : followers;

  return (
    <>
      {contributors.length > 0 &&
        contributors.map((contributor) => {
          return <Contributor contributor={contributor} key={contributor._id} />;
        })}
    </>
  );
};

export default FollowBody;
