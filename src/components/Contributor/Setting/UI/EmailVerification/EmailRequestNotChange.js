import styles from "./EmailVerification.module.css";
const EmailRequestNotChange = ({ isLoading, verifyEmailHandler }) => {
  return (
    <>
      <p>Please verify your email address to have access to all features of flownews</p>
      <button
        className={styles.verifyEmailButton}
        disabled={isLoading.type === "verify" ? true : false}
        onClick={(event) => {
          verifyEmailHandler(event, { type: "verify" });
        }}
      >
        {isLoading.type === "verify" ? "Sending verification link" : "Verify"}
      </button>
    </>
  );
};

export default EmailRequestNotChange;
