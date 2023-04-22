import { useContext } from "react";
import { useTitle } from "../../../../hooks/useTitle";
import { AuthContext } from "../../../../store/Auth/auth-context";
import EmailVerification from "../UI/EmailVerification/EmailVerification";

import ThemeMode from "./ThemeMode";
const Appearance = () => {
  useTitle("Appearance");
  const {
    userData: { emailRequestChangeAddressIsVerified, emailRequestChange },
  } = useContext(AuthContext);
  return (
    <section>
      {(!emailRequestChangeAddressIsVerified || emailRequestChange) && <EmailVerification />}
      <h2>Theme preferences</h2>
      <hr />
      <p>
        Choose how Flownews looks to you. Select a single theme,the default value is the browser
        theme
      </p>
      <ThemeMode />
    </section>
  );
};

export default Appearance;
