import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import styles from "./EditProfile.module.css";
const EditProfile = () => {
  const { userData } = useContext(AuthContext);

  return (
    <>
      {userData.username && (
        <section className={styles.edit_profile}>
          <h2>Public Profile</h2>
          <hr />
        </section>
      )}
    </>
  );
};

export default EditProfile;
