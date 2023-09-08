import { BiLocationPlus } from "react-icons/bi";
import styles from "./ProfileLocation.module.css";
const ProfileLocation = (props) => {
  //----------> get the location of the contributor from the contributor data
  const { location } = props;

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

export default ProfileLocation;
