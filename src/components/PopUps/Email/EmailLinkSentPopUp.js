import { useCallback } from "react";
import { BiEnvelope, BiX } from "react-icons/bi";
import PopUp from "../../../UI/PopUp";
import styles from "./EmailLinkSentPopUp.module.css";

const EmailLinkSentPopUp = (props) => {
  //----------> This component is responsible for rendering the notification that the email has been sent
  const {
    isLoading,
    resentSuccess,
    onSetEmailSent,
    onResendEmailLink,
    emailRequestChangeAddress,
    onSetShowEmailLinkSentPopUp,
    onMakeBodyFixed,
    makeBodyFixed,
  } = props;

  const closePopUpHandler = useCallback(
    (event) => {
      //----------> A function that is called when the user clicks the cancel arrow on the PopUp
      event.stopPropagation();
      //----------> If body is fixed, make it normal
      if (makeBodyFixed) {
        onMakeBodyFixed(false);
      }
      //----------> set the email sent to false and make the popup invisible
      onSetEmailSent((prevState) => false);
      onSetShowEmailLinkSentPopUp((prevState) => false);
    },
    [onSetEmailSent, onSetShowEmailLinkSentPopUp, onMakeBodyFixed, makeBodyFixed]
  );
  const localPartOfEmail = emailRequestChangeAddress.split("@")[0];
  const lengthOfLocalPartOfEmail = localPartOfEmail.length;

  const domainName = "@" + emailRequestChangeAddress.split("@")[1];

  return (
    <PopUp className={`${styles.email_link_sent}`} onClick={closePopUpHandler}>
      <BiX className={`${styles.icon} ${styles.cancel}`} onClick={closePopUpHandler} />
      <div className={styles.header}>
        <h4>FINAL STEP</h4>
        <h2>CONFIRM EMAIL</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.email}>
          <BiEnvelope className={styles.email_icon} />
        </div>

        <div className={styles.message}>
          We sent a message to{" "}
          <div className={styles.contributor_email}>
            {" "}
            <p
              className={`${styles.local_part} ${lengthOfLocalPartOfEmail >= 15 && styles["fixed-width"]}`}
            >{`${localPartOfEmail}`}</p>
            <p className={styles.domain_name}>{`${domainName}`}</p>
          </div>
          . Tap the verify button in that email to verify your account. If it doesn't appear within a few
          minutes, check your spam folder
        </div>
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
              {isLoading.type === "verify" ? "Sending verification link" : "RESEND ACCOUNT VERIFICATION"}
            </button>
          </>
        )}

        {resentSuccess && <p>Email has been successfully resent</p>}
      </div>
    </PopUp>
  );
};

export default EmailLinkSentPopUp;
