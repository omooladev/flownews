import styles from "./EmailVerification.module.css";
const EmailRequestChange = ({
  isLoading,
  error,
  emailRequestChangeAddress,
  verifyEmailHandler,
  onCancelEmailRequestChangeHandler,
}) => {
  return (
    <>
      <p>
        You have requested to change your email to{" "}
        <a href={`mailto:${emailRequestChangeAddress}`}>{emailRequestChangeAddress}</a>. Verify now
        to finalize the change or cancel the request
      </p>
      {error && <p className="error">{error}</p>}
      <button
        className={styles.verifyEmailButton}
        disabled={isLoading.type === "verify" ? true : false}
        onClick={(event) => {
          verifyEmailHandler(event, { type: "verify" });
        }}
      >
        {isLoading.type === "verify" ? "Sending verification link" : "Verify"}
      </button>
      <button
        className={styles.cancel}
        onClick={onCancelEmailRequestChangeHandler}
        disabled={isLoading.type === "cancel" ? true : false}
      >
        {isLoading.type === "cancel" ? "Cancelling email change request" : "Cancel"}
      </button>
    </>
  );
};

export default EmailRequestChange;
