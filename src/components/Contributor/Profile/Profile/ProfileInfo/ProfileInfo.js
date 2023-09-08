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
import ProfileFollow from "./ProfileFollow";
const ProfileInfo = () => {
  const { contributorData, searchedContributorData } = useContext(AuthContext);
  let searchedContributorExist = searchedContributorData.username;

  return (
    <section className={styles["contributor_info"]}>
      <div className={styles.username}>
        <h2>
          {searchedContributorExist ? searchedContributorData.username : contributorData.username}
        </h2>
        {searchedContributorExist
          ? searchedContributorData.userVerified
          : contributorData.userVerified && <BiBadgeCheck className={styles.badge} />}
      </div>
      <ProfileFollow
        followers={
          searchedContributorExist ? searchedContributorData.followers : contributorData.followers
        }
        following={
          searchedContributorExist ? searchedContributorData.following : contributorData.following
        }
      />
      <p className={styles.bio}>
        {searchedContributorExist ? searchedContributorData.bio : contributorData.bio}
      </p>
      <div className={styles.contributor_location_email_joinedDate}>
        <ProfileLocation
          location={
            searchedContributorExist ? searchedContributorData.location : contributorData.location
          }
        />
        <ProfileDate
          createdAt={
            searchedContributorExist ? searchedContributorData.createdAt : contributorData.createdAt
          }
        />
        <ProfileEmail
          email={searchedContributorExist ? searchedContributorData.email : contributorData.email}
          emailIsVerified={
            searchedContributorExist
              ? searchedContributorData.emailIsVerified
              : contributorData.emailIsVerified
          }
        />
      </div>
      <hr />
      <ProfileEducationWork
        education={
          searchedContributorData ? searchedContributorData.education : contributorData.education
        }
        work={searchedContributorData ? searchedContributorData.work : contributorData.work}
      />
      <ProfileMoreInfo
        username={
          searchedContributorData ? searchedContributorData.username : contributorData.username
        }
      />
    </section>
  );
};

export default ProfileInfo;
