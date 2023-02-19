import { useContext } from "react";
import { useTitle } from "../../../../hooks/useTitle";
import { AuthContext } from "../../../../store/Auth/auth-context";
import ConnectAccount from "../UI/ConnectAccount/ConnectAccount";
import EmailVerify from "../UI/EmailVerification/VerifyEmail_CancelEmailRequest";

const Account = () => {
  useTitle("Account Settings");
  const {
    userData: { emailIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      {(!emailIsVerified || emailRequestChange) && <EmailVerify />}
      <ConnectAccount />
    </section>
  );
};

export default Account;
