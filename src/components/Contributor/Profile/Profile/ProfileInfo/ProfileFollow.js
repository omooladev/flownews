import { BiUser } from "react-icons/bi";
import styles from "./ProfileFollow.module.css";
const ProfileFollow = (props) => {
    const { followers, following } = props;
  return (
    <section className={styles.follow}>
      <div className={styles.followers}>
        <BiUser className={styles.icon} />
        <h4>{followers}</h4>
        <label>followers</label>
      </div>
      <div className={styles.following}>
        <h4>{following}</h4>
        <label>following</label>
      </div>
    </section>
  );
};

export default ProfileFollow;
