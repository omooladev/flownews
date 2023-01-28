import ProfileBox from "../../Header/Navigation/ContributorNavigations/ProfileBox";
import Card from "../../../UI/Card";
import styles from "./Profile.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import ProfileButton from "./Profile/ProfileButton";
import ProfileInfo from "./Profile/ProfileInfo/ProfileInfo";
const Profile = () => {
  const { headerIsLoading } = useContext(AuthContext);

  // createdAt: "2023-01-21T21:36:34.331Z";
  // email: "omooladev@gmail.com";
  // emailIsVerified: false;
  // isSearch: "";
  // tokenExpirationTime: "30d";
  // userVerified: false;
  // username: "omooladev@gmail.com";
  // _id: "63cc5ae234c26f3a17c724b2";

  return (
    <>
      {!headerIsLoading && (
        <section className={`main-container ${styles.profile}`}>
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
