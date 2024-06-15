import { useContext } from "react";
import { AppContext } from "../../../store/App/app-context";
import styles from "./Profile.module.css";
import ProfileBox from "../../../UI/ProfileBox";
import ProfileButton from "./Profile/ProfileButton";
import ProfileInfo from "./Profile/ProfileInfo/ProfileInfo";

const Profile = () => {
  const {
    appMode: { theme },
  } = useContext(AppContext);

  return (
    <section className={`${styles.profile} ${theme.includes("light") ? styles.light : styles.dark}`}>
      <div className={styles.profile_text_container}>
        <ProfileBox className="Profile__ProfileBox" />
        <ProfileButton />
        <ProfileInfo />
      </div>
    </section>
  );
};

export default Profile;
