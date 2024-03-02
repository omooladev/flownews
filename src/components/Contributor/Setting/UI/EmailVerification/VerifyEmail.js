import styles from "./EmailVerification.module.css";
const VerifyEmail = ({ isLoading, verifyEmailHandler }) => {
  return (
    <>
      <p>
        Please verify your email address to have access to all features of
        flowNews
      </p>
      <button
        className={styles.verifyEmailButton}
        disabled={isLoading.type === "verify" ? true : false}
        onClick={(event) => {
          verifyEmailHandler(event, { action: "verify" });
        }}
      >
        {isLoading.type === "verify" ? "Sending verification link..." : "Verify"}
      </button>
    </>
  );
};

export default VerifyEmail;
