
import styles from "./ProfileCard.module.css";

import ProfileInfo from "../components/Contributor/Profile/Profile/ProfileInfo/ProfileInfo";
const ProfileCard = (props) => {
  const className = props.className || "";
  return (
    <section className={`${className} ${styles["profile-card"]}`}>
      <ProfileInfo className={styles["profile-info"]}/>
    </section>
  );
};

export default ProfileCard;
