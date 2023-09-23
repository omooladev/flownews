import { BiBadgeCheck } from "react-icons/bi";
import styles from "./ProfileName.module.css";
const ProfileName = (props) => {
  //----------> get either the contributor data or searched contributor data
  const { data } = props;
  return (
    <div className={styles["profile-name_container"]}>
      <div className={styles.name}>
        <h2>{data.fullname || data.username}</h2>
        <div className={styles.icon}>
          {data.contributorIsVerified && <BiBadgeCheck className={styles.verified_badge} />}
        </div>
      </div>
      <div>
        <h3>@{data.username}</h3>
        <span>Follows you</span>
      </div>
    </div>
  );
};

export default ProfileName;
