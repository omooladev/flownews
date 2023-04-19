import { useContext } from "react";
import { useTitle } from "../../../../hooks/useTitle";
import { AuthContext } from "../../../../store/Auth/auth-context";
import ConnectAccount from "../UI/ConnectAccount/ConnectAccount";
import EmailVerify from "../UI/EmailVerification/SendVerificationEmail_CancelEmailChangeRequest";
import DeleteAccount from "./DeleteAccount";

const Account = () => {
  useTitle("Account Settings");
  const {
    userData: { emailRequestChangeAddressIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      {(!emailRequestChangeAddressIsVerified || emailRequestChange) && <EmailVerify />}
      <ConnectAccount />
      <DeleteAccount />
    </section>
  );
};

export default Account;