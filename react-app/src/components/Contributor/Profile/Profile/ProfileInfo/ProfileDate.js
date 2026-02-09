import { FaBirthdayCake } from "react-icons/fa";
import styles from "./ProfileDate.module.css";
const ProfileDate = (props) => {
  let { createdAt } = props;
  createdAt = new Date(createdAt);
  let calenderMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = createdAt.getMonth();
  month = calenderMonth[month];
  const date = createdAt.getDate();
  const year = createdAt.getFullYear();

  return (
    <span className={styles.date}>
      <div className={`icon-wrapper ${styles["icon-wrapper"]}`}>
        <FaBirthdayCake className={styles.icon} />
      </div>
      <p className={styles.dates}>{`Joined on ${month} ${date}, ${year}`}</p>
    </span>
  );
};

export default ProfileDate;
