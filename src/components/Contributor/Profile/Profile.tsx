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

  //  ${theme.includes("light") ? styles.light : styles.dark}`}

  return (
    <section className={`${styles.profile}`}>
      {theme === "light-default" && <div className={styles["profile-light-theme-only-container"]}></div>}
      <div className={styles["profile-container"]}>
        <div className={styles["profile-details"]}>
          <ProfileBox className="Profile__ProfileBox" />
          <ProfileButton />
          <ProfileInfo />
        </div>
      </div>
    </section>
  );
};

export default Profile;
