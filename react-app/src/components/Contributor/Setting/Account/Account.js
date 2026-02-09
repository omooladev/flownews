import { useContext } from "react";
import { useTitle } from "../../../../hooks/useTitle";
import { AuthContext } from "../../../../store/Auth/auth-context";
import ConnectAccount from "../UI/ConnectAccount/ConnectAccount";
import EmailVerification from "../UI/EmailVerification/EmailVerification";
import DeleteAccount from "./DeleteAccount";

const Account = () => {
  useTitle("Account Settings");
  const {
    contributorData: { emailRequestChangeAddressIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      {(!emailRequestChangeAddressIsVerified || emailRequestChange) && <EmailVerification />}
      <ConnectAccount />
      <DeleteAccount />
    </section>
  );
};

export default Account;
