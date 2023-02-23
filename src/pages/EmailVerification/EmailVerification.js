import { useEffect, useCallback, useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import EmailTokenExpired from "../../components/Contributor/EmailVerification/EmailVerificationExpired";
import useFetchContributorData from "../../hooks/useFetchContributorData";
import { AuthContext } from "../../store/Auth/auth-context";
import styles from "./EmailVerification.module.css";
const EmailVerification = () => {
  useFetchContributorData();
  const { _id, token } = useParams();
  const { onVerifyEmailAddress } = useContext(AuthContext);
  const location = useLocation();
  const [message, setMessage] = useState("");

  const verifyEmailHandler = useCallback(async () => {
    const response = await onVerifyEmailAddress(location.pathname);
    const error = response.error || "";
    if (error === "token not found") {
      setMessage(error);
    }
    console.log(response);
  }, [location, onVerifyEmailAddress]);

  useEffect(() => {
    if (_id && token) {
      verifyEmailHandler();
    }
  }, [_id, token, verifyEmailHandler]);

  return (
    <div className={styles.email_verification}>
      {message === "token not found" && <EmailTokenExpired />}
    </div>
  );
};

export default EmailVerification;
