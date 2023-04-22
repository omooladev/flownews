import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import EmailVerification from "../UI/EmailVerification/EmailVerification";
import ConnectAccount from "../UI/ConnectAccount/ConnectAccount";
import User from "./UI/User";
const EditProfile = () => {
  const {
    contributorData: { emailRequestChangeAddressIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      <h2>Public Profile</h2>
      <hr />
      {(!emailRequestChangeAddressIsVerified || emailRequestChange) && <EmailVerification />}
      <ConnectAccount />
      <User />
    </section>
  );
};

export default EditProfile;
