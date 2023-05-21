import Card from "../../../UI/Card";
import styles from "./Profile.module.css";
import ProfileBox from "../../Header/Navigation/ContributorNavigations/ProfileBox";
import ProfileButton from "./Profile/ProfileButton";
import ProfileInfo from "./Profile/ProfileInfo/ProfileInfo";
import { useContext } from "react";
import { AppContext } from "../../../store/App/app-context";
const Profile = () => {
  const {appMode:{theme}}=useContext(AppContext)
  console.log(theme)
  return (
    <section className={styles.profile}>
      <Card className={styles.profile_text_container}>
        <ProfileBox className="Profile__ProfileBox" />
        <ProfileButton />
        <ProfileInfo />
      </Card>
    </section>
  );
};

export default Profile;
