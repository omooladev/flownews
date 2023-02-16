import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import EmailVerify from "../UI/EmailVerification/VerifyEmail_CancelEmailRequest";

import ConnectAccount from "./UI/ConnectAccount";

import User from "./UI/User";
const EditProfile = () => {
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
