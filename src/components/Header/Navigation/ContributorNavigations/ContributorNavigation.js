//<---------- import modules ---------->

import { useLocation } from "react-router-dom";
import Write from "./Write";
import Notification from "./Notification";
import ProfileSection from "./ProfileSection";
import styles from "./ContributorNavigation.module.css";
import Publish from "./Publish";

const ContributorNavigation = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes("/new-story") && <Publish />}
      {!location.pathname.includes("/new-story") && <Write className={styles.write} />}
      <Notification className={styles.notification} />
      <ProfileSection />
    </>
  );
};

export default ContributorNavigation;

//<---------- Documentation ---------->

// The elements/navigation here only displays once the contributor is logged in
