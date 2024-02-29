import styles from "./ProfileInfo.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";

import ProfileLocation from "./ProfileLocation";
import ProfileDate from "./ProfileDate";
import ProfileEmail from "./ProfileEmail";
import ProfileEducationWork from "./ProfileEducationWork";
import ProfileMoreInfo from "./ProfileMoreInfo";
import ProfileFollow from "./ProfileFollow";
import ProfileName from "./ProfileName";
import ProfileBio from "./ProfileBio";
const ProfileInfo = () => {
  //----------> access the following properties from the authentication context
  const { contributorData, searchedContributorData } = useContext(AuthContext);
  console.log({contributor_followers:contributorData.followers,contributor_following:contributorData.following}, searchedContributorData);
  //----------> check if the searched contributor exist
  let searchedContributorExist = searchedContributorData.username;

  return (
    <section className={styles["contributor_info"]}>
      <ProfileName data={searchedContributorExist ? searchedContributorData : contributorData} />

      <ProfileFollow
        followersCount={
          searchedContributorExist
            ? searchedContributorData.followersCount
            : contributorData.followersCount
        }
        followingCount={
          searchedContributorExist
            ? searchedContributorData.followingCount
            : contributorData.followingCount
        }
      />
      <ProfileBio
        bio={searchedContributorExist ? searchedContributorData.bio : contributorData.bio}
      />

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
        {((searchedContributorExist && !searchedContributorData.emailIsPrivate) ||
          !searchedContributorExist) && (
          <ProfileEmail
            email={searchedContributorExist ? searchedContributorData.email : contributorData.email}
            emailIsVerified={
              searchedContributorExist
                ? searchedContributorData.emailIsVerified
                : contributorData.emailIsVerified
            }
          />
        )}
      </div>

      <ProfileEducationWork
        education={
          searchedContributorExist ? searchedContributorData.education : contributorData.education
        }
        work={searchedContributorExist ? searchedContributorData.work : contributorData.work}
      />
      <ProfileMoreInfo
        username={
          searchedContributorExist ? searchedContributorData.username : contributorData.username
        }
      />
    </section>
  );
};

export default ProfileInfo;
