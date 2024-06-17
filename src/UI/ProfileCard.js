import ProfileInfo from "../components/Contributor/Profile/Profile/ProfileInfo/ProfileInfo";
import ProfileBox from "./ProfileBox";
import styles from "./ProfileCard.module.css";
const ProfileCard = (props) => {
  const className = props.className || "";
  return (
    <section className={`${className} ${styles["profile-card"]}`}>
      <ProfileBox className="ProfileCard__ProfileBox" />
      <ProfileInfo className={styles["profile-info"]} />
    </section>
  );
};

export default ProfileCard;