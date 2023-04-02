import { useCallback, useContext } from "react";
import { BiX } from "react-icons/bi";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import styles from "./ProfileUpdated.module.css";
const ProfileUpdated = () => {
  const { profileUpdated, onChangeProfileUpdated } = useContext(AuthContext);
  const closeProfileUpdatedHandler = useCallback(() => {
    onChangeProfileUpdated(false);
  }, [onChangeProfileUpdated]);
  return (
    <>
      {profileUpdated && (
        <div className={styles.profile_updated}>
          <p>Your Profile has been updated</p>
          <BiX className={styles.icon} onClick={closeProfileUpdatedHandler} />
        </div>
      )}
    </>
  );
};

export default ProfileUpdated;
