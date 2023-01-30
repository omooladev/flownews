import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import Card from "../../../UI/Card";
import styles from "./Profile.module.css";
import ProfileBox from "../../Header/Navigation/ContributorNavigations/ProfileBox";
import ProfileButton from "./Profile/ProfileButton";
import ProfileInfo from "./Profile/ProfileInfo/ProfileInfo";
const Profile = () => {
  const { userData } = useContext(AuthContext);

  return (
    <>
      {userData.username && (
        <section className={` main-container ${styles.profile} `}>
          <Card className={styles.profile_text_container}>
            <ProfileBox className={styles.profile_box} />
            <ProfileButton />
            <ProfileInfo />
          </Card>
        </section>
      )}
    </>
  );
};

export default Profile;
