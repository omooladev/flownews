import EmailPrivacy from "./EmailPrivacy";
import { useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import EmailVerification  from "../../UI/EmailVerification/EmailVerification"

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
          <EmailVerification />
          <hr />
        </>
      )}
      <EmailPrivacy />
    </section>
  );
};

export default EmailSettings;
