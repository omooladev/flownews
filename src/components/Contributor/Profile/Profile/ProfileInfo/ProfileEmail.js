import { BiEnvelope, BiXCircle } from "react-icons/bi";
import styles from "./ProfileEmail.module.css";
const ProfileEmail = (props) => {
  let { email, emailIsVerified } = props;

  return (
    <div className={styles.email}>
      <div className={`global-icon-container`}>
        <BiEnvelope className={`global-icon`} />
      </div>

      <span>{email}</span>
      {!emailIsVerified && (
        <div className={`global-icon-container`}>
          <BiXCircle className={`global-icon ${styles.not_verified}`} title="email not verified" />
        </div>
      )}
    </div>
  );
};

export default ProfileEmail;
