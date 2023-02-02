import styles from "./EmailMessage.module.css";
const EmailMessage = (props) => {
  const { email, emailRequestChange, emailIsVerified } = props;
  

  return (
    <div className={styles.email_verification}>
      <h3>Email Verification</h3>
      {emailRequestChange && emailIsVerified && (
        <p>
          You have requested a change to <a href={`mailto:${email}`}>{email}</a> Check your inbox
          for verification link to finalize the change
        </p>
      )}
      {(!emailIsVerified || (!emailIsVerified && emailRequestChange)) && (
        <>
          <p>
            Please verify your email address and activate your account to have access to all
            features of flownews
          </p>
          <button className={styles.send_email}>Send Email</button>
        </>
      )}
    </div>
  );
};

export default EmailMessage;
