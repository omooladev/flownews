import styles from "./ProfileEducationWork.module.css";
const ProfileEducationWork = (props) => {
  const { education, work } = props;
  return (
    <div className={styles.education_work}>
      <div className={styles.education}>
        <label>Education</label>
        <p>{education || "Nil"}</p>
      </div>
      <div className={styles.work}>
        <label>Work</label>
        <p>{work || "Nil"}</p>
      </div>
    </div>
  );
};

export default ProfileEducationWork;
