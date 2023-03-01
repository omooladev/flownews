import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import ForgotPassword from "./ForgotPassword";

const ResetPassword = (props) => {
  const { authReply, onChangeAuthReply, onResetAuthReply, onValidateEmail } = props;
  const { onVerifyPasswordResetLink, history } = useContext(AuthContext);
  const location = history.location;
  const [isLoading, setIsLoading] = useState(false);
  const [linkIsValid, setLinkIsValid] = useState(null);
  const verifyPasswordResetLink = useCallback(async () => {
    setIsLoading(true);
    const response = await onVerifyPasswordResetLink(location.pathname);
    const status = response.status || "";
    const error = response.error || "";
    if (status === 200) {
      setLinkIsValid(true);
    }
    if (error) {
      setLinkIsValid(false);
      onChangeAuthReply({
        type: "error",
        message: error,
      });
    }
    setIsLoading(false);
  }, [location, onVerifyPasswordResetLink, onChangeAuthReply]);
  useEffect(() => {
    verifyPasswordResetLink();
  }, [verifyPasswordResetLink]);
  // useEffect(() => {
  //   onResetAuthReply();
  // }, [onResetAuthReply]);
  return (
    <>
      {isLoading && <h3>Checking Link....</h3>}
      {!isLoading && !linkIsValid && linkIsValid !== null && (
        <ForgotPassword
          linkIsValid={linkIsValid}
          authReply={authReply}
          onChangeAuthReply={onChangeAuthReply}
          onResetAuthReply={onResetAuthReply}
          onValidateEmail={onValidateEmail}
        />
      )}
      {!isLoading && linkIsValid && <p>link is so valid</p>}
    </>
  );
};

export default ResetPassword;
