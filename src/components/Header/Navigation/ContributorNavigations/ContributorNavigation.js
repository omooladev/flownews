//? NOTE---All navigation links here are for the contributors
import styles from "./ContributorNavigation.module.css";
import Write from "./Write";
import Notification from "./Notification";
import ProfileSection from "./ProfileSection";
const ContributorNavigation = () => {
  return (
    <>
      <Write className={styles.write} />
      <Notification className={styles.notification} />
      <ProfileSection />
    </>
  );
};

export default ContributorNavigation;
