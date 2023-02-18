import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import EmailVerify from "../UI/EmailVerification/VerifyEmail_CancelEmailRequest";
import {useTitle} from "../../../../hooks/useTitle"
import ConnectAccount from "./UI/ConnectAccount";

import User from "./UI/User";
const EditProfile = () => {
  useTitle("Your Profile")
  const {
    userData: { emailIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      <h2>Public Profile</h2>
      <hr />
      {(!emailIsVerified || emailRequestChange) && <EmailVerify />}
      <ConnectAccount />
      <User />
    </section>
  );
};

export default EditProfile;
