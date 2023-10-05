import ProfileButton from "../Profile/ProfileButton";
import ProfileBio from "../Profile/ProfileInfo/ProfileBio";
import ProfileName from "../Profile/ProfileInfo/ProfileName";
import styles from "./Contributor.module.css";
//----------> This file is to render a contributor
const Contributor = ({ contributor }) => {
  const {
    follows_you,
    contributor: { fullname, username, bio, profilePicture },
  } = contributor;

  let contributorData = { ...contributor.contributor, follows_you };

  return (
    <li className={styles["contributor-container"]}>
      <div></div>
      <div>
        <span className={styles["contributor-header"]}>
          <ProfileName data={contributorData} className="contributor-card" />
          <ProfileButton />
        </span>
        <ProfileBio bio={bio} className="contributor-bio" />
      </div>
    </li>
  );
};
export default Contributor;
