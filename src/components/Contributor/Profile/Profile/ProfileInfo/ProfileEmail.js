import { BiEnvelope, BiXCircle } from "react-icons/bi";
import styles from "./ProfileEmail.module.css";
const ProfileEmail = (props) => {
  let { email, emailIsVerified } = props;

  return (
    <span className={styles.email}>
      <BiEnvelope className="absolute-icon" />
      <span>{email}</span>
      {!emailIsVerified && (
        <BiXCircle className={` ${styles.not_verified}`} title="email not verified" />
      )}
    </span>
  );
};

export default ProfileEmail;
