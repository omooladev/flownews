import { BiEnvelope, BiXCircle, BiCheckCircle } from "react-icons/bi";
import styles from "./ProfileEmail.module.css";
const ProfileEmail = (props) => {
  let { email, emailIsVerified } = props;

  return (
    <div className={styles.email}>
      <BiEnvelope />
      <p>{email}</p>
      {emailIsVerified ? (
        <BiCheckCircle className={styles.verified} />
      ) : (
        <BiXCircle className={styles.not_verified} />
      )}
    </div>
  );
};

export default ProfileEmail;
