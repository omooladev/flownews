import Card from "../../../../../UI/Card";
import styles from "./EmailMessage.module.css";
const EmailMessage = (props) => {
  const { emailRequestChange, emailIsVerified, emailRequestChangeAddress } = props;

  return (
    <Card className={styles.email_verification}>
      <h3>Email Verification</h3>
      {emailRequestChange && emailIsVerified && (
        <>
          <p>
            You have requested to change your email to{" "}
            <a href={`mailto:${emailRequestChangeAddress}`}>{emailRequestChangeAddress}</a>. Verify
            now to finalize the change
          </p>
          <button className={styles.verify_email}>Verify Email</button>
        </>
      )}
      {(!emailIsVerified || (!emailIsVerified && emailRequestChange)) && (
        <>
          <p>Please verify your email address to have access to all features of flownews</p>
          <button className={styles.verify_email}>Verify Email</button>
        </>
      )}
    </Card>
  );
};

export default EmailMessage;
