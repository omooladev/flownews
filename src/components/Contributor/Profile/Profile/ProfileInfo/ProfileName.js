import { BiBadgeCheck } from "react-icons/bi";
import styles from "./ProfileName.module.css";
const ProfileName = (props) => {
  //----------> get data and the additional class name if it exists
  //----------> The additional class name is used to configure the ProfileName component from a component where
  //            it is been used
  const { data, className: additionalClassName } = props;
  const source = props.source || "";

  //---------->configuring the className to accept additional styles
  let className = `${styles["profile-name_container"]} ${
    additionalClassName ? styles[additionalClassName] : ""
  } ${source && styles[source]}`;
  return (
    <div className={className}>
      <div className={styles.name}>
        <h2>{data.fullname || data.username}</h2>
        <div className={styles.icon}>
          {data.contributorIsVerified && <BiBadgeCheck className={styles.verified_badge} />}
        </div>
      </div>
      <div className={styles.username}>
        <h3>@{data.username}</h3>
        {/* {data.isFollowingContributor ||
          (data.follows_you && <p className={styles.follows_you}>Follows you</p>)} */}
      </div>
    </div>
  );
};

export default ProfileName;
