//<---------- import modules ---------->

import Write from "./Write";
import Notification from "./Notification";
import ProfileSection from "./ProfileSection";
import styles from "./ContributorNavigation.module.css";
import Publish from "./Publish";
import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";

const ContributorNavigation = () => {
  const {
    history,
    newStory: { temporaryId },
  } = useContext(AuthContext);

  return (
    <>
      {(history.location.pathname.startsWith("/new-story") ||
        history.location.pathname.startsWith(`/story/${temporaryId}/edit`)) && <Publish />}
      {!history.location.pathname.startsWith("/new-story") &&
        !history.location.pathname.startsWith(`/story/${temporaryId}/edit`) && (
          <Write className={styles.write} />
        )}
      <Notification className={styles.notification} />
      <ProfileSection />
    </>
  );
};

export default ContributorNavigation;

//<---------- Documentation ---------->

// The elements/navigation here only displays once the contributor is logged in
