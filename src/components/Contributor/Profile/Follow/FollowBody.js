import Contributor from "./Contributor";

const FollowBody = ({ followPath, data }) => {
  const { following, followers } = data;
  const contributors = followPath === "following" ? following : followers;

  return (
    <>
      {contributors.forEach((contributor) => {
        return <Contributor {...contributor} />;
      })}
    </>
  );
};

export default FollowBody;
