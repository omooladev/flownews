import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import styles from "./EditProfile.module.css";
import ConnectAccount from "./UI/ConnectAccount";
import EmailMessage from "./UI/EmailMessage";
import User from "./UI/User";
const EditProfile = () => {
  const {
    userData: { username, email, emailIsVerified },
  } = useContext(AuthContext);

  const emailRequestChange = false;

  return (
    <>
      {username && (
        <section className={styles.edit_profile}>
          <h2 className={styles.public_profile}>Public Profile</h2>
          <hr />
          {(!emailIsVerified || emailRequestChange) && (
            <EmailMessage
              email={email}
              emailIsVerified={emailIsVerified}
              emailRequestChange={emailRequestChange}
            />
          )}
          <ConnectAccount />
          <User />
        </section>
      )}
    </>
  );
};

export default EditProfile;
