import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import FollowHeader from "./FollowHeader";
import FollowBody from "./FollowBody";
import styles from "./Follow.module.css";
const Follow = (props) => {
  //----------> get the follow path and username
  const { followPath } = props;
  const { searchedContributorData, contributorData } = useContext(AuthContext);

  return (
    <section className={styles["follow-container"]}>
      <FollowHeader followPath={followPath} searchedContributorData={searchedContributorData} />
      <hr />
      <FollowBody
        followPath={followPath}
        data={searchedContributorData.username ? searchedContributorData : contributorData}
      />
    </section>
  );
};

export default Follow;
