import { useContext } from "react";
// import { dummyContributor } from "../../../../../data";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import ProfileLocation from "./ProfileLocation";
import ProfileDate from "./ProfileDate";
import styles from "./ProfileInfo.module.css";
import ProfileEmail from "./ProfileEmail";
import { BiBadgeCheck } from "react-icons/bi";
const ProfileInfo = () => {
  const {
    userData: {
      location,
      bio,
      username,
      createdAt,
      email,
      userVerified,
      emailIsVerified,
      // education,
      // work,
    },
  } = useContext(AuthContext);
  // const { bio, location } = dummyContributor;
  const education = "Federal University of Technology, Akure";
  const work = "Student";

  return (
    <section className={styles["contributor_info"]}>
      <div className={styles.username}>
        <h2>{username}</h2>
        {userVerified && <BiBadgeCheck className={styles.badge} />}
      </div>
      <p className={styles.bio}>
        {bio || "Tell people what they should know about you, please update your bio"}
      </p>
      <div className={styles.contributor_location_email_joinedDate}>
        <ProfileLocation location={location} />
        <ProfileDate createdAt={createdAt} />
        <ProfileEmail email={email} emailIsVerified={emailIsVerified} />
      </div>
      <hr />
      {(education || work) && (
        <div className={styles.education_work}>
          {education && (
            <div className={styles.education}>
              <label>Education</label>
              <p>{education}</p>
            </div>
          )}
          {work && (
            <div className={styles.work}>
              <label>Work</label>
              <p>{work}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ProfileInfo;
