import { BiLocationPlus } from "react-icons/bi";
import styles from "./ProfileLocation.module.css";
const ProfileLocation = (props) => {
  //----------> get the location of the contributor from the contributor data
  const { location } = props;

  return (
    <>
      {location && (
        <div className={styles.location}>
          <div className={`global-icon-container`}>
            <BiLocationPlus className={`global-icon`} />
          </div>

          <p>{location}</p>
        </div>
      )}
    </>
  );
};

export default ProfileLocation;
