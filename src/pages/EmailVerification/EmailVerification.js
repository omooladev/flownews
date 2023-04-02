import { useEffect, useCallback, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import EmailTokenExpired from "../../components/Contributor/EmailVerification/EmailVerificationExpired";
import EmailVerified from "../../components/Contributor/EmailVerification/EmailVerified";
import EmailVerifiedAlready from "../../components/Contributor/EmailVerification/EmailVerifiedAlready";
import SuspenseLoader from "../../components/Loaders/SuspenseLoader";
import useFetchContributorData from "../../hooks/useFetchContributorData";
import { AuthContext } from "../../store/Auth/auth-context";
import styles from "./EmailVerification.module.css";
const EmailVerification = () => {
  useFetchContributorData();
  const { onVerifyEmailAddress, onSetUserData } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verifyEmailHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await onVerifyEmailAddress(pathname);
    const data = response.data || "";
    const error = response.error || "";
    setIsLoading(false);
    if (data) {
      const message = data.message || "";
      const contributor = data.contributor || "";
      if (message) {
        if (message === "email address already verified") {
          setMessage("email address already verified");
        }
        if (message === "email address has been verified successfully") {
          setMessage("email address has been verified successfully");
          onSetUserData(contributor);
        }
      }
    }
    if (error) {
      if (error === "invalid link") {
        setMessage("invalid link");
      } else {
        setMessage(error);
      }
    }
  }, [pathname, onVerifyEmailAddress, onSetUserData]);

  useEffect(() => {
    if (pathname) {
      verifyEmailHandler();
    }
  }, [pathname, verifyEmailHandler]);

  return (
    <div className={styles.email_verification}>
      {isLoading && <SuspenseLoader />}
      {!isLoading && message === "invalid link" && <EmailTokenExpired />}
      {!isLoading && message === "email address already verified" && <EmailVerifiedAlready />}
      {!isLoading && message === "email address has been verified successfully" && (
        <EmailVerified />
      )}
    </div>
  );
};

export default EmailVerification;
