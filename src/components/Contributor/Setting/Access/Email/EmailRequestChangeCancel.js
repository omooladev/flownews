import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import useHttp from "../../../../../hooks/useHttp";
import styles from "./EmailRequestChangeCancel.module.css";
const EmailRequestChangeCancel = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    HOSTURI,
    token,
    onSetUserData,
    userData: { emailRequestChange, emailRequestChangeAddress, emailIsVerified, email },
  } = useContext(AuthContext);
  const { sendRequest } = useHttp();

  const cancelEmailRequestChangeHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      setError("")
      setIsLoading((prevState) => {
        return !prevState;
      });
      const response = await sendRequest(`${HOSTURI}/email/cancel-email-change-request`, {
        method: "PATCH",
        userData: { contributorEmail: email },
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
        return !prevState;
      });
    },
    [sendRequest, email, HOSTURI, token, onSetUserData]
  );
  return (
    <>
      <div className={styles.email_request_change_cancel}>
        {emailRequestChange && emailIsVerified && (
          <>
            <p>
              You have requested to change your email to{" "}
              <a href={`mailto:${emailRequestChangeAddress}`}>{emailRequestChangeAddress}</a>.
              Verify now to finalize the change or cancel the request
            </p>
            {error && <p className="error">{error}</p>}
            <button className={styles.verify_email} disabled={isLoading ? true : false}>
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
        {(!emailIsVerified || (!emailIsVerified && emailRequestChange)) && (
          <>
            <p>Please verify your email address to have access to all features of flownews</p>
            <button className={styles.verify_email}>Verify Email</button>
          </>
        )}
      </div>
      <hr />
    </>
  );
};

export default EmailRequestChangeCancel;
