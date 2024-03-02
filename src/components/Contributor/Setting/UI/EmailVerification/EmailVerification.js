//<---------- Import ---------->
import { Fragment, useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";

//<---------- Import Hooks ---------->
import useHttp from "../../../../../hooks/useHttp";

//<---------- Import components ---------->
import VerifyEmail from "./VerifyEmail";
import EmailRequestChange from "./EmailRequestChange";
import EmailLinkSentPopUp from "../../../../PopUps/Email/EmailLinkSentPopUp";

//<---------- Import Styles ---------->
import styles from "./EmailVerification.module.css";
import Card from "../../../../../UI/Card";

const EmailVerification = () => {
  //---------> access the sendRequest function from the useHTTP hook
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
  //<---------- States ---------->
  const [isLoading, setIsLoading] = useState({ type: "" }); //----------> this accepts what we are loading for
  const [error, setError] = useState("an error has occured");
  const [emailSent, setEmailSent] = useState(false);
  const [resentSuccess, setResentSuccess] = useState(false);

  const cancelEmailRequestChangeHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      setError("");
      setIsLoading((prevState) => {
        return { ...prevState, type: "cancel" };
      });
      const response = await sendRequest(
        `${HOSTURI}/email/cancel-email-change-request`,
        {
          method: "PATCH",
          token,
        }
      );
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
    async (event, { action }) => {
      event.stopPropagation();
      setError("");
      setIsLoading((prevState) => {
        return { ...prevState, type: "verify" };
      });

      setEmailSent((prevState) => {
        return true;
      });
      setIsLoading((prevState) => {
        return { ...prevState, type: "" };
      });
      return;
      // // eslint-disable-next-line

      // // eslint-disable-next-line
      // const response = await sendRequest(
      //   `${HOSTURI}/email/sendVerificationLink`,
      //   {
      //     method: "PATCH",
      //     token,
      //   }
      // );
      // // const response={status:200} //* for testing
      // const error = response.error || "";
      // const status = response.status || "";

      // if (status === 200) {
      //   setEmailSent(true);
      //   onSetShowEmailLinkSentPopUp(true);
      //   const { type } = Type || "";
      //   if (type === "resend") {
      //     setResentSuccess(true);
      //     setTimeout(() => {
      //       setResentSuccess(false);
      //     }, 2000);
      //   }
      // }
      // // eslint-disable-next-line
      // if (error) {
      //   setError(error);
      //   setEmailSent(false);
      //   onSetShowEmailLinkSentPopUp(false);
      // }
    },
    [HOSTURI, sendRequest, token, onSetShowEmailLinkSentPopUp]
  );
  return (
    <Fragment>
      <Card className={styles.email_verification}>
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
        {/* If Contributor already requested for an email change and the new email 
        has not been verified, display this */}
        {emailRequestChange && !emailRequestChangeAddressIsVerified && (
          <EmailRequestChange
            isLoading={isLoading}
            error={error}
            emailRequestChangeAddress={emailRequestChangeAddress}
            verifyEmailHandler={verifyEmailHandler}
            onCancelEmailRequestChangeHandler={cancelEmailRequestChangeHandler}
          />
        )}
        {/* If Contributor did not request for an email change and his primary email
        has not been verified, display this. By default the email request change address is 
        always the primary email used in creating an account*/}
        {!emailRequestChange && !emailRequestChangeAddressIsVerified && (
          <VerifyEmail
            error={error}
            isLoading={isLoading}
            verifyEmailHandler={verifyEmailHandler}
          />
        )}
      </Card>
    </Fragment>
  );
};

export default EmailVerification;
