import { useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";

const ResetPassword = () => {
  const { onVerifyPasswordResetLink, history } = useContext(AuthContext);
  const location = history.location;
  const verifyPasswordResetLink = useCallback(async () => {
    const response = onVerifyPasswordResetLink(location.pathname);
  }, [location, onVerifyPasswordResetLink]);
  useEffect(() => {
    verifyPasswordResetLink();
  }, [verifyPasswordResetLink]);
  return <></>;
};

export default ResetPassword;
