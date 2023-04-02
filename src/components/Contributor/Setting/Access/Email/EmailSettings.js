import EmailPrivacy from "./EmailPrivacy";
import { useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import EmailVerify from "../../UI/EmailVerification/SendVerificationEmail_CancelEmailChangeRequest";

const EmailSettings = () => {
  const {
    userData: { emailRequestChangeAddressIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      <h2>Email</h2>
      <hr />
      {(!emailRequestChangeAddressIsVerified || emailRequestChange) && (
        <>
          <EmailVerify />
          <hr />
        </>
      )}
      <EmailPrivacy />
    </section>
  );
};

export default EmailSettings;
