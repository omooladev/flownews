import ProfileInfo from "../components/Contributor/Profile/Profile/ProfileInfo/ProfileInfo";
import ProfileBox from "./ProfileBox";
import styles from "./ProfileCard.module.css";
const ProfileCard = (props) => {
  const className = props.className || "";
  const source = props.source || "";
  return (
    <section className={`${className} ${styles["profile-card"]}`}>
      <ProfileBox className="ProfileCard__ProfileBox" />
      <ProfileInfo className={styles["profile-info"]} source={source} />
    </section>
  );
};

export default ProfileCard;
