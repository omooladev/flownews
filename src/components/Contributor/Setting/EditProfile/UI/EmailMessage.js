import Card from "../../../../../UI/Card";
import styles from "./EmailMessage.module.css";
const EmailMessage = (props) => {
  const { email, emailRequestChange, emailIsVerified } = props;

  return (
    <Card className={styles.email_verification}>
      <h3>Email Verification</h3>
      {emailRequestChange && emailIsVerified && (
        <p>
          You have requested a change to <a href={`mailto:${email}`}>{email}</a> Check your inbox
          for verification link to finalize the change
        </p>
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
