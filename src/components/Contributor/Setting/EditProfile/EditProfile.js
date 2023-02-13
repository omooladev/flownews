import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import EmailVerify from "../UI/EmailVerification/VerifyEmail_CancelEmailRequest";
import styles from "./EditProfile.module.css";
import ConnectAccount from "./UI/ConnectAccount";

import User from "./UI/User";
const EditProfile = () => {
  const {
    userData: { emailIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section className={styles.edit_profile}>
      <h2 className={styles.public_profile}>Public Profile</h2>
      <hr />
      {(!emailIsVerified || emailRequestChange) && <EmailVerify />}
      <ConnectAccount />
      <User />
    </section>
  );
};

export default EditProfile;
