import styles from "./ProfileEducationWork.module.css";
const ProfileEducationWork = (props) => {
  const { education, work } = props;
  return (
    <>
      {(education || work) && (
        <div className={styles.education_work}>
          {education && (
            <div className={styles.education}>
              <label>Education</label>
              <p>{education}</p>
            </div>
          )}
          {work && (
            <div className={styles.work}>
              <label>Work</label>
              <p>{work}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileEducationWork;
