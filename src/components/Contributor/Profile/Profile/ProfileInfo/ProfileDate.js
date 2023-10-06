import { FaBirthdayCake } from "react-icons/fa";
import styles from "./ProfileDate.module.css";
const ProfileDate = (props) => {
  let { createdAt } = props;
  createdAt = new Date(createdAt);
  let calenderMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = createdAt.getMonth();
  month = calenderMonth[month];
  const date = createdAt.getDate();
  const year = createdAt.getFullYear();

  return (
    <span className={styles.date}>
      <FaBirthdayCake className="absolute-icon" />
      <span className={styles.dates}>{`Joined on ${month} ${date}, ${year}`}</span>
    </span>
  );
};

export default ProfileDate;
