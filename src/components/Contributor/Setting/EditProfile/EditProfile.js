import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import EmailVerify from "../UI/EmailVerification/SendVerificationEmail_CancelEmailChangeRequest";
import {useTitle} from "../../../../hooks/useTitle"
import ConnectAccount from "../UI/ConnectAccount/ConnectAccount";

import User from "./UI/User";
const EditProfile = () => {
  useTitle("Your Profile")
  const {
    userData: { emailRequestChangeAddressIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      <h2>Public Profile</h2>
      <hr />
      {(!emailRequestChangeAddressIsVerified || emailRequestChange) && <EmailVerify />}
      <ConnectAccount />
      <User />
    </section>
  );
};

export default EditProfile;
