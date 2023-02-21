import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import useHttp from "../../../../../hooks/useHttp";
import styles from "./SendVerificationEmail_CancelEmailChangeRequest.module.css";
import EmailLinkSentPopUp from "./EmailLinkSentPopUp";
const EmailVerify = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(true);
  const [resentSuccess, setRecentSuccess] = useState(false);
  const {
    HOSTURI,
    token,
    onSetUserData,
    userData: { emailRequestChange, emailRequestChangeAddress, emailIsVerified },
  } = useContext(AuthContext);
  const { sendRequest } = useHttp();

  const cancelEmailRequestChangeHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      setError("");
      setIsLoading((prevState) => {
        return true;
      });
      const response = await sendRequest(`${HOSTURI}/email/cancel-email-change-request`, {
        method: "PATCH",
        token,
      });
      const error = response.error || "";
      const data = response.data || "";
      if (data) {
        onSetUserData(data);
      }
      if (error) {
        setError(error);
      }
      setIsLoading((prevState) => {
        return false;
      });
    },
    [sendRequest, HOSTURI, token, onSetUserData]
  );
  const verifyEmailHandler = useCallback(async (event, Type) => {
    event.stopPropagation();
    setError("");
    setIsLoading((prevState) => {
      return true;
    });
    const response = await sendRequest(`${HOSTURI}/email/sendVerificationLink`, {
      method: "PATCH",
      token,
    });

    const error = response.error || "";
    const status = response.status || "";

    if (status === 200) {
      setEmailSent(true);
      const { type } = Type || "";
      if (type === "resend") {
        setRecentSuccess(true);
        setTimeout(() => {
          setRecentSuccess(false);
        }, 1000);
      }
    }
    if (error) {
      setError(error);
      setEmailSent(false);
    }
    setIsLoading((prevState) => {
      return false;
    });
  }, []);
  return (
    <div className={styles.email_request_change_cancel}>
      {(emailSent || resentSuccess) && (
        <EmailLinkSentPopUp
          resentSuccess={resentSuccess}
          emailRequestChangeAddress={emailRequestChangeAddress}
          onResendEmailLink={verifyEmailHandler}
          onSetEmailSent={(bool) => {
            setEmailSent(bool);
          }}
        />
      )}
      <h3>Email Verification</h3>
      {emailRequestChange && !emailIsVerified && (
        <>
          <p>
            You have requested to change your email to{" "}
            <a href={`mailto:${emailRequestChangeAddress}`}>{emailRequestChangeAddress}</a>. Verify
            now to finalize the change or cancel the request
          </p>
          {error && <p className="error">{error}</p>}
          <button
            className={styles.verify_email}
            disabled={isLoading ? true : false}
            onClick={verifyEmailHandler}
          >
            Verify
          </button>
          <button
            className={styles.cancel}
            onClick={cancelEmailRequestChangeHandler}
            disabled={isLoading ? true : false}
          >
            Cancel
          </button>
        </>
      )}
      {!emailRequestChange && !emailIsVerified && (
        <>
          <p>Please verify your email address to have access to all features of flownews</p>
          <button
            className={styles.verify_email}
            onClick={(event) => {
              verifyEmailHandler(event, { type: "verify" });
            }}
          >
            Verify Email
          </button>
        </>
      )}
    </div>
  );
};

export default EmailVerify;
