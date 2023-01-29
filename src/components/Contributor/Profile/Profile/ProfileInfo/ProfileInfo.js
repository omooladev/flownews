import { useContext } from "react";
// import { dummyContributor } from "../../../../../data";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import ProfileLocation from "./ProfileLocation";
import ProfileDate from "./ProfileDate";
import styles from "./ProfileInfo.module.css";
import ProfileEmail from "./ProfileEmail";
import { BiBadgeCheck } from "react-icons/bi";
import ProfileEducationWork from "./ProfileEducationWork";
import ProfileMoreInfo from "./ProfileMoreInfo";
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
        {bio}
      </p>
      <div className={styles.contributor_location_email_joinedDate}>
        <ProfileLocation location={location} />
        <ProfileDate createdAt={createdAt} />
        <ProfileEmail email={email} emailIsVerified={emailIsVerified} />
      </div>
      <hr />
      <ProfileEducationWork education={education} work={work} />
      <ProfileMoreInfo username={username} />
    </section>
  );
};

export default ProfileInfo;
