import styles from "./EmailRequestChangeCancel.module.css";
const EmailRequestChangeCancel = (props) => {
  const { emailRequestChange, emailRequestChangeAddress, emailIsVerified } = props;
  return (
    <div className={styles.email_request_change_cancel}>
      {emailRequestChange && emailIsVerified && (
        <>
          <p>
            You have requested to change your email to{" "}
            <a href={`mailto:${emailRequestChangeAddress}`}>{emailRequestChangeAddress}</a>. Verify
            now to finalize the change or cancel the request
          </p>
          <button className={styles.verify_email}>Verify</button>
          <button className={styles.cancel}>Cancel</button>
        </>
      )}
      {(!emailIsVerified || (!emailIsVerified && emailRequestChange)) && (
        <>
          <p>Please verify your email address to have access to all features of flownews</p>
          <button className={styles.verify_email}>Verify Email</button>
        </>
      )}
    </div>
  );
};

export default EmailRequestChangeCancel;
