import { BiLocationPlus } from "react-icons/bi";
import styles from "./ProfileLocation.module.css";
const ProfileDate = (props) => {
  let { location } = props;

  return (
    <>
      {location && (
        <div className={styles.location}>
          <BiLocationPlus />
          <p>{location}</p>
        </div>
      )}
    </>
  );
};

export default ProfileDate;
