import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import useHttp from "../../../../../hooks/useHttp";
import EmailLinkSentPopUp from "../../../../PopUps/Email/EmailLinkSentPopUp";
import styles from "./EmailVerification.module.css";
const EmailVerification = () => {
  const { sendRequest } = useHttp();
  const {
    HOSTURI,
    token,
    onSaveContributorData,
    onSetShowEmailLinkSentPopUp,
    contributorData: {
      emailRequestChange,
      emailRequestChangeAddress,
      emailRequestChangeAddressIsVerified,
    },
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState({ type: "" });
  const [error, setError] = useState("an error www");
  const [emailSent, setEmailSent] = useState(false);
  const [resentSuccess, setResentSuccess] = useState(false);

  const cancelEmailRequestChangeHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      setError("");
      setIsLoading((prevState) => {
        return { ...prevState, type: "cancel" };
      });
      const response = await sendRequest(`${HOSTURI}/email/cancel-email-change-request`, {
        method: "PATCH",
        token,
      });
      const error = response.error || "";
      const data = response.data || "";
      if (data) {
        onSaveContributorData(data);
      }
      if (error) {
        setError(error);
      }
      setIsLoading((prevState) => {
        return { ...prevState, type: "" };
      });
    },
    [sendRequest, HOSTURI, token, onSaveContributorData]
  );
  const verifyEmailHandler = useCallback(
    async (event, Type) => {
      event.stopPropagation();
      setError("");
      setIsLoading((prevState) => {
        return { ...prevState, type: "verify" };
      });

      const response = await sendRequest(`${HOSTURI}/email/sendVerificationLink`, {
        method: "PATCH",
        token,
      });
      // const response={status:200} //* for testing
      const error = response.error || "";
      const status = response.status || "";

      if (status === 200) {
        setEmailSent(true);
        onSetShowEmailLinkSentPopUp(true);
        const { type } = Type || "";
        if (type === "resend") {
          setResentSuccess(true);
          setTimeout(() => {
            setResentSuccess(false);
          }, 2000);
        }
      }
      if (error) {
        setError(error);
        setEmailSent(false);
        onSetShowEmailLinkSentPopUp(false);
      }
      setIsLoading((prevState) => {
        return { ...prevState, type: "" };
      });
    },
    [HOSTURI, sendRequest, token, onSetShowEmailLinkSentPopUp]
  );
  return (
    <div className={styles.email_verification}>
      {emailSent && (
        <EmailLinkSentPopUp
          isLoading={isLoading}
          resentSuccess={resentSuccess}
          emailRequestChangeAddress={emailRequestChangeAddress}
          onResendEmailLink={verifyEmailHandler}
          onSetEmailSent={(bool) => {
            setEmailSent(bool);
          }}
          onSetShowEmailLinkSentPopUp={(bool) => {
            onSetShowEmailLinkSentPopUp(bool);
          }}
        />
      )}
      <h3>Email Verification</h3>
      {emailRequestChange && !emailRequestChangeAddressIsVerified && (
        <>
          <p>
            You have requested to change your email to{" "}
            <a href={`mailto:${emailRequestChangeAddress}`}>{emailRequestChangeAddress}</a>. Verify
            now to finalize the change or cancel the request
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
            onClick={cancelEmailRequestChangeHandler}
            disabled={isLoading.type === "cancel" ? true : false}
          >
            {isLoading.type === "cancel" ? "Cancelling email change request" : "Cancel"}
          </button>
        </>
      )}
      {!emailRequestChange && !emailRequestChangeAddressIsVerified && (
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
      )}
    </div>
  );
};

export default EmailVerification;
