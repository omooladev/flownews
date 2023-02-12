import { BiLocationPlus } from "react-icons/bi";
import styles from "./ProfileLocation.module.css";
const ProfileLocation = (props) => {
  const { location } = props;

  return (
    <div className={styles.location}>
      <BiLocationPlus />
      <p>{location || "Somewhere around the world"}</p>
    </div>
  );
};

export default ProfileLocation;
