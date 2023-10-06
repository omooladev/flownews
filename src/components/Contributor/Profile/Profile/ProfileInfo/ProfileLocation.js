import { BiLocationPlus } from "react-icons/bi";
import styles from "./ProfileLocation.module.css";
const ProfileLocation = (props) => {
  //----------> get the location of the contributor from the contributor data
  const { location } = props;

  return (
    <>
      {location && (
        <span className={styles.location}>
          <BiLocationPlus className="absolute-icon" />
          <span>{location}</span>
        </span>
      )}
    </>
  );
};

export default ProfileLocation;
