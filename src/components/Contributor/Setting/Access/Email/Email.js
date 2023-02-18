import EmailPrivacy from "./EmailPrivacy";
import { useContext } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import EmailVerify from "../../UI/EmailVerification/VerifyEmail_CancelEmailRequest";
import { useTitle } from "../../../../../hooks/useTitle";

const Email = () => {
  useTitle("Email Settings");
  const {
    userData: { emailIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      <h2>Email</h2>
      <hr />
      {(!emailIsVerified || emailRequestChange) && (
        <>
          <EmailVerify />
          <hr />
        </>
      )}
      <EmailPrivacy />
    </section>
  );
};

export default Email;
