import { useEffect, useCallback, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetchContributorData from "../../hooks/useFetchContributorData";
import { AuthContext } from "../../store/Auth/auth-context";
const EmailVerification = () => {
  useFetchContributorData();
  const { _id, token } = useParams();
  const { onVerifyEmailAddress } = useContext(AuthContext);
  const location = useLocation();

  const verifyEmailHandler = useCallback(async () => {
    const response = await onVerifyEmailAddress(location.pathname);
  }, [location, onVerifyEmailAddress]);

  useEffect(() => {
    if (_id && token) {
      verifyEmailHandler();
    }
  }, [_id, token, verifyEmailHandler]);

  return <div></div>;
};

export default EmailVerification;
