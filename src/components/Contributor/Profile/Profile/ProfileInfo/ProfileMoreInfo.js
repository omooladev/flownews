import Card from "../../../../../UI/Card";
import styles from "./ProfileMoreInfo.module.css";
const ProfileMoreInfo = (props) => {
  const { username } = props;
  console.log(username);
  return (
    <div className={styles.more_info}>
      <Card>{`More info about @${username}`}</Card>
    </div>
  );
};

export default ProfileMoreInfo;
