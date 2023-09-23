import { BiBadgeCheck } from "react-icons/bi";
import styles from "./ProfileName.module.css";
const ProfileName = (props) => {
  //----------> get either the contributor data or searched contributor data
  const { data } = props;
  console.log(data);
  return (
    <div className={styles["profile-name_container"]}>
      <div className={styles.name}>
        <h2>{data.fullname || data.username}</h2>
        <div className={styles.icon}>
          {data.contributorIsVerified && <BiBadgeCheck className={styles.verified_badge} />}
        </div>
      </div>
      <div className={styles.username}>
        <h3>@{data.username}</h3>
        {data.isFollowingContributor && <p className={styles.follows_you}>Follows you</p>}
      </div>
    </div>
  );
};

export default ProfileName;
