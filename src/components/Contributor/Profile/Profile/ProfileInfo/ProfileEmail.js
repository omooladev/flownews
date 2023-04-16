import { BiEnvelope, BiXCircle } from "react-icons/bi";
import styles from "./ProfileEmail.module.css";
const ProfileEmail = (props) => {
  let { email, emailIsVerified } = props;

  return (
    <div className={styles.email}>
      <BiEnvelope />
      <p>{email}</p>
      {!emailIsVerified && <BiXCircle className={styles.not_verified} title="email not verified" />}
    </div>
  );
};

export default ProfileEmail;
