import { useCallback } from "react";
import { BiEnvelope, BiX } from "react-icons/bi";
import PopUp from "../../../../../UI/PopUp";
import styles from "./EmailLinkSentPopUp.module.css";

const EmailLinkSentPopUp = (props) => {
  const {
    isLoading,
    resentSuccess,
    onSetEmailSent,
    onResendEmailLink,
    emailRequestChangeAddress,
    onSetShowEmailLinkSentPopUp,
  } = props;
  const closePopUpHandler = useCallback(
    (event) => {
      event.stopPropagation();
      onSetEmailSent(false);
      onSetShowEmailLinkSentPopUp(false);
    },
    [onSetEmailSent, onSetShowEmailLinkSentPopUp]
  );
  return (
    <PopUp className={`auth_popup ${styles.email_link_sent}`} onClick={closePopUpHandler}>
      <BiX className={`${styles.icon} ${styles.cancel}`} onClick={closePopUpHandler} />
      <div className={styles.header}>
        <h4>FINAL STEP</h4>
        <h2>CONFIRM EMAIL</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.email}>
          <BiEnvelope className={styles.email_icon} />
        </div>
        <p className={styles.message}>
          {`We sent a message to ${emailRequestChangeAddress}. Tap the verify button in that email to verify your account. If it doesn't appear within a few minutes, check your spam folder`}
        </p>
      </div>
      <div className={styles.resend_verification}>
        {!resentSuccess && (
          <>
            {isLoading.type !== "verify" && <BiEnvelope className={styles.email} />}
            <button
              type="button"
              onClick={(event) => {
                onResendEmailLink(event, { type: "resend" });
              }}
            >
              {isLoading.type === "verify"
                ? "Sending verification link"
                : "RESEND ACCOUNT VERIFICATION"}
            </button>
          </>
        )}

        {resentSuccess && <p>Email has been successfully resent</p>}
      </div>
    </PopUp>
  );
};

export default EmailLinkSentPopUp;
