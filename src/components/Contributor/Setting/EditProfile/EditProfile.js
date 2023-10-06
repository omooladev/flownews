import EmailVerification from "../UI/EmailVerification/EmailVerification";
import ConnectAccount from "../UI/ConnectAccount/ConnectAccount";
import User from "./UI/User";
const EditProfile = () => {
  return (
    <section>
      <h2>Public Profile</h2>
      <hr />
      <EmailVerification />
      <ConnectAccount />
      <User />
    </section>
  );
};

export default EditProfile;
