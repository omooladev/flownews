import ProfileBox from "../../Header/Navigation/ContributorNavigations/ProfileBox";
import Card from "../../../UI/Card";
import styles from "./Profile.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
const Profile = () => {
  const { headerIsLoading } = useContext(AuthContext);
  return (
    <>
      {!headerIsLoading && (
        <section className={`main-container ${styles.profile}`}>
          <Card className={styles.profile_text_container}>
            <ProfileBox className={styles.profile_box} />
          </Card>
        </section>
      )}
    </>
  );
};

export default Profile;
