import { useContext } from "react";
import ThemeMode from "./ThemeMode";
import { AuthContext } from "../../../../store/Auth/auth-context";
import EmailVerification from "../UI/EmailVerification/EmailVerification";

const Appearance = () => {
  //----------> check if the contributor has requested for an email change or if he has verified the new email he wants
  //            to change
  const {
    contributorData: {
      emailRequestChangeAddressIsVerified,
      emailRequestChange,
    },
  } = useContext(AuthContext);

  return (
    <section>
      {(!emailRequestChangeAddressIsVerified || emailRequestChange) && (
        <EmailVerification />
      )}
      <h2>Theme preferences</h2>
      <hr />
      <p>
        Choose how FlowNews looks to you. Select a single theme,the default
        value is the browser theme
      </p>
      <ThemeMode />
    </section>
  );
};

export default Appearance;
